import React from 'react'
import RcPagination, { PaginationLocale, PaginationProps as RcPaginationProps } from 'rc-pagination'
import classNames from 'classnames'
import MiniSelect from './miniSelect'
import Select from '../select'
import userBreakpoint from '../_util/hooks/useBreakpoint'
import Icon from '../icon'
import { prefixClsIcon } from '../_util/prefixClsIcon'

const defaultLocale: PaginationLocale = {
  items_per_page: '条/页',
  jump_to: '跳至',
  jump_to_confirm: '确定',
  page: '页',
  prev_page: '上一页',
  next_page: '下一页',
  prev_5: '向前 5 页',
  next_5: '向后 5 页',
  prev_3: '向前 3 页',
  next_3: '向后 3 页',
}

export interface PaginationProps extends RcPaginationProps {
  showQuickJumper?: boolean | { goButton?: React.ReactNode }
  size?: 'default' | 'small'
  responsive?: boolean
  role?: string
  totalBoundaryShowSizeChanger?: number
}

export type PaginationPosition = 'top' | 'bottom' | 'both'

export interface PaginationConfig extends PaginationProps {
  position?: PaginationPosition
}

const Pagination: React.FC<PaginationProps> = ({
  prefixCls: customPrefixCls,
  selectPrefixCls: customSelectPrefixCls,
  className,
  size,
  locale: customLocale,
  selectComponentClass,
  responsive,
  ...restProps
}) => {
  const { xs } = userBreakpoint(responsive)
  const prefixCls = customPrefixCls ?? 'st-pagination'
  const getIconsProps = () => {
    const ellipsis = <span className={`${prefixCls}-item-ellipsis`}>•••</span>
    let prevIcon = (
      <button className={`${prefixCls}-item-link`} type="button" tabIndex={-1}>
        {prefixClsIcon(<Icon icon={'angle-left'} />)}
      </button>
    )
    let nextIcon = (
      <button className={`${prefixCls}-item-link`} type="button" tabIndex={-1}>
        {prefixClsIcon(<Icon icon={'angle-right'} />)}
      </button>
    )
    let jumpPrevIcon = (
      <a className={`${prefixCls}-item-link`}>
        <div className={`${prefixCls}-item-container`}>
          {prefixClsIcon(<Icon icon={'angles-left'} />, `${prefixCls}-item-link-icon`)}
          {ellipsis}
        </div>
      </a>
    )
    let jumpNextIcon = (
      <a className={`${prefixCls}-item-link`}>
        <div className={`${prefixCls}-item-container`}>
          {prefixClsIcon(<Icon icon={'angles-right'} />, `${prefixCls}-item-link-icon`)}
          {ellipsis}
        </div>
      </a>
    )
    return { prevIcon, nextIcon, jumpPrevIcon, jumpNextIcon }
  }

  const renderPagination = () => {
    const isSmall = size === 'small' || !!(xs && !size && responsive)
    const selectPrefixCls = customSelectPrefixCls ?? 'st-select'
    const extendedClassName = classNames(
      {
        mini: isSmall,
      },
      className,
    )

    return (
      <RcPagination
        {...getIconsProps()}
        {...restProps}
        prefixCls={prefixCls}
        selectPrefixCls={selectPrefixCls}
        className={extendedClassName}
        selectComponentClass={selectComponentClass || (isSmall ? MiniSelect : Select)}
        locale={defaultLocale}
      />
    )
  }

  return renderPagination()
}

export default Pagination
