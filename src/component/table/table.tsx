import React from 'react'
import classNames from 'classnames'
import omit from 'rc-util/lib/omit'
import RcTable, { Summary } from 'rc-table'
import { TableProps as RcTableProps, INTERNAL_HOOKS } from 'rc-table/lib/Table'
import { convertChildrenToColumns } from 'rc-table/lib/hooks/useColumns'
import Spin, { SpinProps } from '../spin'
import Pagination from '../pagination'
import { TooltipProps } from '../tooltip'
import usePagination, { DEFAULT_PAGE_SIZE, getPaginationParam } from './hook/usePagination'
import useLazyKVMap from './hook/useLazyKVMap'
import { Breakpoint } from '../_util/responsiveObserver'
import {
  TableRowSelection,
  GetRowKey,
  ColumnType,
  TableCurrentDataSource,
  SorterResult,
  GetPopupContainer,
  ExpandableConfig,
  ExpandType,
  SortOrder,
  TableLocale,
  TableAction,
  FilterValue,
  ColumnsType,
  TablePaginationConfig,
} from './interface'
import useSelection, {
  SELECTION_ALL,
  SELECTION_COLUMN,
  SELECTION_INVERT,
  SELECTION_NONE,
} from './hook/useSelection'
import useSorter, { getSortData, SortState } from './hook/useSorter'
import useFilter, { getFilterData, FilterState } from './hook/useFilter'
import useTitleColumns from './hook/useTitleColumns'
import renderExpandIcon from './ExpandIcon'
import scrollTo from '../_util/scrollTo'
import Column from './Column'
import ColumnGroup from './ColumnGroup'
import useBreakpoint from '../_util/hooks/useBreakpoint'
import { SizeType } from '../_util/type'

export type { ColumnsType, TablePaginationConfig }

const EMPTY_LIST: any[] = []

const defaultLocale: TableLocale = {
  filterTitle: '筛选',
  filterConfirm: '确定',
  filterReset: '重置',
  filterEmptyText: '无筛选项',
  filterCheckall: '全选',
  filterSearchPlaceholder: '在筛选项中搜索',
  selectAll: '全选当页',
  selectInvert: '反选当页',
  selectNone: '清空所有',
  selectionAll: '全选所有',
  sortTitle: '排序',
  expand: '展开行',
  collapse: '关闭行',
  triggerDesc: '点击降序',
  triggerAsc: '点击升序',
  cancelSort: '取消排序',
}

interface ChangeEventInfo<RecordType> {
  pagination: {
    current?: number
    pageSize?: number
    total?: number
  }
  filters: Record<string, FilterValue | null>
  sorter: SorterResult<RecordType> | SorterResult<RecordType>[]

  filterStates: FilterState<RecordType>[]
  sorterStates: SortState<RecordType>[]

  resetPagination: Function
}

export interface TableProps<RecordType>
  extends Omit<
    RcTableProps<RecordType>,
    | 'transformColumns'
    | 'internalHooks'
    | 'internalRefs'
    | 'data'
    | 'columns'
    | 'scroll'
    | 'emptyText'
  > {
  dropdownPrefixCls?: string
  dataSource?: RcTableProps<RecordType>['data']
  columns?: ColumnsType<RecordType>
  pagination?: false | TablePaginationConfig
  loading?: boolean | SpinProps
  size?: SizeType
  bordered?: boolean
  locale?: TableLocale

  onChange?: (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<RecordType> | SorterResult<RecordType>[],
    extra: TableCurrentDataSource<RecordType>,
  ) => void
  rowSelection?: TableRowSelection<RecordType>

  getPopupContainer?: GetPopupContainer
  scroll?: RcTableProps<RecordType>['scroll'] & {
    scrollToFirstRowOnChange?: boolean
  }
  sortDirections?: SortOrder[]
  showSorterTooltip?: boolean | TooltipProps
}

function InternalTable<RecordType extends object = any>(
  props: TableProps<RecordType>,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const {
    prefixCls: customizePrefixCls,
    className,
    style,
    size: customizeSize,
    bordered,
    dropdownPrefixCls: customizeDropdownPrefixCls,
    dataSource,
    pagination,
    rowSelection,
    rowKey,
    rowClassName,
    columns,
    children,
    childrenColumnName: legacyChildrenColumnName,
    onChange,
    getPopupContainer,
    loading,
    expandIcon,
    expandable,
    expandedRowRender,
    expandIconColumnIndex,
    indentSize,
    scroll,
    sortDirections,
    locale,
    showSorterTooltip = true,
  } = props

  const baseColumns = React.useMemo(
    () => columns || convertChildrenToColumns(children),
    [columns, children],
  )
  const needResponsive = React.useMemo(
    () => baseColumns.some((col: any) => col.responsive),
    [baseColumns],
  )

  const screens = useBreakpoint(needResponsive)

  const mergedColumns = React.useMemo(() => {
    const matched = new Set(
      Object.keys(screens).filter((m) => {
        return screens[m as Breakpoint]
      }),
    )

    return (baseColumns as ColumnType<RecordType>[]).filter(
      (c: ColumnType<RecordType>) =>
        !c.responsive || c.responsive.some((r: Breakpoint) => matched.has(r)),
    )
  }, [baseColumns, screens])

  const tableProps = omit(props, ['className', 'style', 'columns']) as TableProps<RecordType>

  const mergedSize = customizeSize || 'middle'
  const tableLocale = { defaultLocale, ...locale } as TableLocale
  const rawData: readonly RecordType[] = dataSource || EMPTY_LIST

  const prefixCls = customizePrefixCls ?? 'st-table'
  const dropdownPrefixCls = customizeDropdownPrefixCls ?? 'st-dropdown'

  const mergedExpandable: ExpandableConfig<RecordType> = {
    childrenColumnName: legacyChildrenColumnName,
    expandIconColumnIndex,
    ...expandable,
  }
  const { childrenColumnName = 'children' } = mergedExpandable

  const expandType: ExpandType = React.useMemo<ExpandType>(() => {
    if (rawData.some((item) => (item as any)?.[childrenColumnName])) {
      return 'nest'
    }

    if (expandedRowRender || (expandable && expandable.expandedRowRender)) {
      return 'row'
    }

    return null
  }, [rawData])

  const internalRefs = {
    body: React.useRef<HTMLDivElement>(),
  }

  // ============================ RowKey ============================
  const getRowKey = React.useMemo<GetRowKey<RecordType>>(() => {
    if (typeof rowKey === 'function') {
      return rowKey
    }

    return (record: RecordType) => (record as any)?.[rowKey as string]
  }, [rowKey])

  const [getRecordByKey] = useLazyKVMap(rawData, childrenColumnName, getRowKey)

  // ============================ Events =============================
  const changeEventInfo: Partial<ChangeEventInfo<RecordType>> = {}

  const triggerOnChange = (
    info: Partial<ChangeEventInfo<RecordType>>,
    action: TableAction,
    reset: boolean = false,
  ) => {
    const changeInfo = {
      ...changeEventInfo,
      ...info,
    }

    if (reset) {
      changeEventInfo.resetPagination!()

      // Reset event param
      if (changeInfo.pagination!.current) {
        changeInfo.pagination!.current = 1
      }

      // Trigger pagination events
      if (pagination && pagination.onChange) {
        pagination.onChange(1, changeInfo.pagination!.pageSize!)
      }
    }

    if (scroll && scroll.scrollToFirstRowOnChange !== false && internalRefs.body.current) {
      scrollTo(0, {
        getContainer: () => internalRefs.body.current!,
      })
    }

    onChange?.(changeInfo.pagination!, changeInfo.filters!, changeInfo.sorter!, {
      currentDataSource: getFilterData(
        getSortData(rawData, changeInfo.sorterStates!, childrenColumnName),
        changeInfo.filterStates!,
      ),
      action,
    })
  }

  /**
   * Controlled state in `columns` is not a good idea that makes too many code (1000+ line?) to read
   * state out and then put it back to title render. Move these code into `hooks` but still too
   * complex. We should provides Table props like `sorter` & `filter` to handle control in next big version.
   */

  // ============================ Sorter =============================
  const onSorterChange = (
    sorter: SorterResult<RecordType> | SorterResult<RecordType>[],
    sorterStates: SortState<RecordType>[],
  ) => {
    triggerOnChange(
      {
        sorter,
        sorterStates,
      },
      'sort',
      false,
    )
  }
  const [transformSorterColumns, sortStates, sorterTitleProps, getSorters] = useSorter<RecordType>({
    prefixCls,
    mergedColumns,
    onSorterChange,
    sortDirections: sortDirections || ['ascend', 'descend'],
    tableLocale,
    showSorterTooltip,
  })
  const sortedData = React.useMemo(
    () => getSortData(rawData, sortStates, childrenColumnName),
    [rawData, sortStates],
  )

  changeEventInfo.sorter = getSorters()
  changeEventInfo.sorterStates = sortStates

  // ============================ Filter ============================
  const onFilterChange = (
    filters: Record<string, FilterValue | null>,
    filterStates: FilterState<RecordType>[],
  ) => {
    triggerOnChange(
      {
        filters,
        filterStates,
      },
      'filter',
      true,
    )
  }

  const [transformFilterColumns, filterStates, getFilters] = useFilter<RecordType>({
    prefixCls,
    locale: tableLocale,
    dropdownPrefixCls,
    mergedColumns,
    onFilterChange,
    getPopupContainer,
  })
  const mergedData = getFilterData(sortedData, filterStates)

  changeEventInfo.filters = getFilters()
  changeEventInfo.filterStates = filterStates

  // ============================ Column ============================
  const columnTitleProps = React.useMemo(
    () => ({
      ...sorterTitleProps,
    }),
    [sorterTitleProps],
  )
  const [transformTitleColumns] = useTitleColumns(columnTitleProps)

  // ========================== Pagination ==========================
  const onPaginationChange = (current: number, pageSize: number) => {
    triggerOnChange(
      {
        pagination: { ...changeEventInfo.pagination, current, pageSize },
      },
      'paginate',
    )
  }

  const [mergedPagination, resetPagination] = usePagination(
    mergedData.length,
    pagination,
    onPaginationChange,
  )

  changeEventInfo.pagination =
    pagination === false ? {} : getPaginationParam(pagination, mergedPagination)

  changeEventInfo.resetPagination = resetPagination

  // ============================= Data =============================
  const pageData = React.useMemo<RecordType[]>(() => {
    if (pagination === false || !mergedPagination.pageSize) {
      return mergedData
    }

    const { current = 1, total, pageSize = DEFAULT_PAGE_SIZE } = mergedPagination

    // Dynamic table data
    if (mergedData.length < total!) {
      if (mergedData.length > pageSize) {
        return mergedData.slice((current - 1) * pageSize, current * pageSize)
      }
      return mergedData
    }

    return mergedData.slice((current - 1) * pageSize, current * pageSize)
  }, [
    !!pagination,
    mergedData,
    mergedPagination && mergedPagination.current,
    mergedPagination && mergedPagination.pageSize,
    mergedPagination && mergedPagination.total,
  ])

  // ========================== Selections ==========================
  const [transformSelectionColumns, selectedKeySet] = useSelection<RecordType>(rowSelection, {
    prefixCls,
    data: mergedData,
    pageData,
    getRowKey,
    getRecordByKey,
    expandType,
    childrenColumnName,
    locale: tableLocale,
    getPopupContainer,
  })

  const internalRowClassName = (record: RecordType, index: number, indent: number) => {
    let mergedRowClassName
    if (typeof rowClassName === 'function') {
      mergedRowClassName = classNames(rowClassName(record, index, indent))
    } else {
      mergedRowClassName = classNames(rowClassName)
    }

    return classNames(
      {
        [`${prefixCls}-row-selected`]: selectedKeySet.has(getRowKey(record, index)),
      },
      mergedRowClassName,
    )
  }

  // ========================== Expandable ==========================

  // Pass origin render status into `rc-table`, this can be removed when refactor with `rc-table`
  ;(mergedExpandable as any).__PARENT_RENDER_ICON__ = mergedExpandable.expandIcon

  // Customize expandable icon
  mergedExpandable.expandIcon =
    mergedExpandable.expandIcon || expandIcon || renderExpandIcon(tableLocale!)

  // Adjust expand icon index, no overwrite expandIconColumnIndex if set.
  if (expandType === 'nest' && mergedExpandable.expandIconColumnIndex === undefined) {
    mergedExpandable.expandIconColumnIndex = rowSelection ? 1 : 0
  } else if (mergedExpandable.expandIconColumnIndex! > 0 && rowSelection) {
    mergedExpandable.expandIconColumnIndex! -= 1
  }

  // Indent size
  if (typeof mergedExpandable.indentSize !== 'number') {
    mergedExpandable.indentSize = typeof indentSize === 'number' ? indentSize : 15
  }

  // ============================ Render ============================
  const transformColumns = React.useCallback(
    (innerColumns: ColumnsType<RecordType>): ColumnsType<RecordType> =>
      transformTitleColumns(
        transformSelectionColumns(transformFilterColumns(transformSorterColumns(innerColumns))),
      ),
    [transformSorterColumns, transformFilterColumns, transformSelectionColumns],
  )

  let topPaginationNode: React.ReactNode
  let bottomPaginationNode: React.ReactNode
  if (pagination !== false && mergedPagination?.total) {
    let paginationSize: TablePaginationConfig['size']
    if (mergedPagination.size) {
      paginationSize = mergedPagination.size
    } else {
      paginationSize = mergedSize === 'small' || mergedSize === 'middle' ? 'small' : undefined
    }

    const renderPagination = (position: string) => (
      <Pagination
        {...mergedPagination}
        className={classNames(
          `${prefixCls}-pagination ${prefixCls}-pagination-${position}`,
          mergedPagination.className,
        )}
        size={paginationSize}
      />
    )
    const defaultPosition = 'right'
    const { position } = mergedPagination
    if (position !== null && Array.isArray(position)) {
      const topPos = position.find((p) => p.indexOf('top') !== -1)
      const bottomPos = position.find((p) => p.indexOf('bottom') !== -1)
      const isDisable = position.every((p) => `${p}` === 'none')
      if (!topPos && !bottomPos && !isDisable) {
        bottomPaginationNode = renderPagination(defaultPosition)
      }
      if (topPos) {
        topPaginationNode = renderPagination(topPos!.toLowerCase().replace('top', ''))
      }
      if (bottomPos) {
        bottomPaginationNode = renderPagination(bottomPos!.toLowerCase().replace('bottom', ''))
      }
    } else {
      bottomPaginationNode = renderPagination(defaultPosition)
    }
  }

  // >>>>>>>>> Spinning
  let spinProps: SpinProps | undefined
  if (typeof loading === 'boolean') {
    spinProps = {
      spinning: loading,
    }
  } else if (typeof loading === 'object') {
    spinProps = {
      spinning: true,
      ...loading,
    }
  }

  const wrapperClassNames = classNames(`${prefixCls}-wrapper`, className)
  return (
    <div ref={ref} className={wrapperClassNames} style={style}>
      <Spin spinning={false} {...spinProps}>
        {topPaginationNode}
        <RcTable<RecordType>
          {...tableProps}
          columns={mergedColumns}
          expandable={mergedExpandable}
          prefixCls={prefixCls}
          className={classNames({
            [`${prefixCls}-middle`]: mergedSize === 'middle',
            [`${prefixCls}-small`]: mergedSize === 'small',
            [`${prefixCls}-bordered`]: bordered,
            [`${prefixCls}-empty`]: rawData.length === 0,
          })}
          data={pageData}
          rowKey={getRowKey}
          rowClassName={internalRowClassName}
          emptyText={(locale && locale.emptyText) || defaultLocale.emptyText || '暂无数据'}
          // Internal
          internalHooks={INTERNAL_HOOKS}
          internalRefs={internalRefs as any}
          transformColumns={transformColumns as any}
        />
        {bottomPaginationNode}
      </Spin>
    </div>
  )
}

const ForwardTable = React.forwardRef(InternalTable) as <RecordType extends object = any>(
  props: React.PropsWithChildren<TableProps<RecordType>> & { ref?: React.Ref<HTMLDivElement> },
) => React.ReactElement

type InternalTableType = typeof ForwardTable

interface TableInterface extends InternalTableType {
  defaultProps?: Partial<TableProps<any>>
  SELECTION_COLUMN: typeof SELECTION_COLUMN
  EXPAND_COLUMN: typeof RcTable.EXPAND_COLUMN
  SELECTION_ALL: 'SELECT_ALL'
  SELECTION_INVERT: 'SELECT_INVERT'
  SELECTION_NONE: 'SELECT_NONE'
  Column: typeof Column
  ColumnGroup: typeof ColumnGroup
  Summary: typeof Summary
}

const Table = ForwardTable as TableInterface

Table.defaultProps = {
  rowKey: 'key',
}

Table.SELECTION_COLUMN = SELECTION_COLUMN
Table.EXPAND_COLUMN = RcTable.EXPAND_COLUMN
Table.SELECTION_ALL = SELECTION_ALL
Table.SELECTION_INVERT = SELECTION_INVERT
Table.SELECTION_NONE = SELECTION_NONE
Table.Column = Column
Table.ColumnGroup = ColumnGroup
Table.Summary = Summary

export default Table
