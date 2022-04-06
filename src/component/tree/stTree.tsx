import React from 'react'
import RcTree, { TreeNode, TreeProps as RcTreeProps, BasicDataNode } from 'rc-tree'
import classNames from 'classnames'
import { DataNode, Key } from 'rc-tree/lib/interface'
import DirectoryTree from './DirectoryTree'
import collapseMotion from '../_util/motion'
import renderSwitcherIcon from './utils/iconUtil'
import dropIndicatorRender from './utils/dropIndicator'
import Icon from '../icon'
import { DirectionType } from '../_util/type'

export interface STTreeNodeAttribute {
  eventKey: string
  prefixCls: string
  className: string
  expanded: boolean
  selected: boolean
  checked: boolean
  halfChecked: boolean
  children: React.ReactNode
  title: React.ReactNode
  pos: string
  dragOver: boolean
  dragOverGapTop: boolean
  dragOverGapBottom: boolean
  isLeaf: boolean
  selectable: boolean
  disabled: boolean
  disableCheckbox: boolean
}

export interface STTreeNodeProps {
  className?: string
  checkable?: boolean
  disabled?: boolean
  disableCheckbox?: boolean
  title?: string | React.ReactNode
  key?: Key
  eventKey?: string
  isLeaf?: boolean
  checked?: boolean
  expanded?: boolean
  loading?: boolean
  selected?: boolean
  selectable?: boolean
  icon?: ((treeNode: STTreeNodeAttribute) => React.ReactNode) | React.ReactNode
  children?: React.ReactNode
  [customProp: string]: any
}

export interface STTreeNode extends React.Component<STTreeNodeProps, {}> {}

export interface STTreeNodeBaseEvent {
  node: STTreeNode
  nativeEvent: MouseEvent
}

export interface STTreeNodeCheckedEvent extends STTreeNodeBaseEvent {
  event: 'check'
  checked?: boolean
  checkedNodes?: STTreeNode[]
}

export interface STTreeNodeSelectedEvent extends STTreeNodeBaseEvent {
  event: 'select'
  selected?: boolean
  selectedNodes?: DataNode[]
}

export interface STTreeNodeExpandedEvent extends STTreeNodeBaseEvent {
  expanded?: boolean
}

export interface STTreeNodeMouseEvent {
  node: STTreeNode
  event: React.DragEvent<HTMLElement>
}

export interface STTreeNodeDragEnterEvent extends STTreeNodeMouseEvent {
  expandedKeys: Key[]
}

export interface STTreeNodeDropEvent {
  node: STTreeNode
  dragNode: STTreeNode
  dragNodesKeys: Key[]
  dropPosition: number
  dropToGap?: boolean
  event: React.MouseEvent<HTMLElement>
}

export type TreeNodeNormal = DataNode

type DraggableFn = (node: STTreeNode) => boolean
interface DraggableConfig {
  icon?: React.ReactNode | false
  nodeDraggable?: DraggableFn
}

export interface TreeProps<T extends BasicDataNode = DataNode>
  extends Omit<RcTreeProps<T>, 'prefixCls' | 'showLine' | 'direction' | 'draggable'> {
  showLine?: boolean | { showLeafIcon: boolean }
  className?: string
  /** 是否支持多选 */
  multiple?: boolean
  /** 是否自动展开父节点 */
  autoExpandParent?: boolean
  /** Checkable状态下节点选择完全受控（父子节点选中状态不再关联） */
  checkStrictly?: boolean
  /** 是否支持选中 */
  checkable?: boolean
  /** 是否禁用树 */
  disabled?: boolean
  /** 默认展开所有树节点 */
  defaultExpandAll?: boolean
  /** 默认展开对应树节点 */
  defaultExpandParent?: boolean
  /** 默认展开指定的树节点 */
  defaultExpandedKeys?: Key[]
  /** （受控）展开指定的树节点 */
  expandedKeys?: Key[]
  /** （受控）选中复选框的树节点 */
  checkedKeys?: Key[] | { checked: Key[]; halfChecked: Key[] }
  /** 默认选中复选框的树节点 */
  defaultCheckedKeys?: Key[]
  /** （受控）设置选中的树节点 */
  selectedKeys?: Key[]
  /** 默认选中的树节点 */
  defaultSelectedKeys?: Key[]
  selectable?: boolean
  /** 点击树节点触发 */
  filterAntTreeNode?: (node: STTreeNode) => boolean
  loadedKeys?: Key[]
  /** 设置节点可拖拽（IE>8） */
  draggable?: DraggableFn | boolean | DraggableConfig
  style?: React.CSSProperties
  showIcon?: boolean
  icon?: ((nodeProps: STTreeNodeAttribute) => React.ReactNode) | React.ReactNode
  switcherIcon?: React.ReactElement<any>
  prefixCls?: string
  children?: React.ReactNode
  blockNode?: boolean
  virtual?: boolean
  direction?: DirectionType
}

type CompoundedComponent = (<T extends BasicDataNode | DataNode = DataNode>(
  props: React.PropsWithChildren<TreeProps<T>> & { ref?: React.Ref<RcTree> },
) => React.ReactElement) & {
  defaultProps: Partial<React.PropsWithChildren<TreeProps<any>>>
  TreeNode: typeof TreeNode
  DirectoryTree: typeof DirectoryTree
}

const Tree = React.forwardRef<RcTree, TreeProps>((props, ref) => {
  const {
    prefixCls: customPrefixCls,
    className,
    showIcon,
    showLine,
    switcherIcon,
    blockNode,
    children,
    checkable,
    selectable,
    draggable,
    virtual,
    direction,
  } = props

  const prefixCls = customPrefixCls ?? 'st-tree'

  const newProps = {
    ...props,
    showLine: Boolean(showLine),
    dropIndicatorRender,
  }

  const draggableConfig = React.useMemo(() => {
    if (!draggable) {
      return false
    }

    let mergedDraggable: DraggableConfig = {}
    switch (typeof draggable) {
      case 'function':
        mergedDraggable.nodeDraggable = draggable
        break
      case 'object':
        mergedDraggable = { ...draggable }
        break
      default:
    }

    if (mergedDraggable.icon !== false) {
      mergedDraggable.icon = mergedDraggable.icon || <Icon icon={'candle-holder'} />
    }

    return mergedDraggable
  }, [draggable])

  return (
    <RcTree
      itemHeight={20}
      ref={ref}
      virtual={virtual}
      {...newProps}
      prefixCls={prefixCls}
      className={classNames(
        {
          [`${prefixCls}-icon-hide`]: !showIcon,
          [`${prefixCls}-block-node`]: blockNode,
          [`${prefixCls}-unselectable`]: !selectable,
          [`${prefixCls}-rtl`]: direction === 'rtl',
        },
        className,
      )}
      direction={direction}
      checkable={checkable ? <span className={`${prefixCls}-checkbox-inner`} /> : checkable}
      selectable={selectable}
      switcherIcon={(nodeProps: STTreeNodeProps) =>
        renderSwitcherIcon(prefixCls, switcherIcon, showLine, nodeProps)
      }
      draggable={draggableConfig as any}
    >
      {children}
    </RcTree>
  )
}) as unknown as CompoundedComponent

Tree.TreeNode = TreeNode

Tree.DirectoryTree = DirectoryTree

Tree.defaultProps = {
  checkable: false,
  selectable: true,
  showIcon: false,
  motion: {
    ...collapseMotion,
    motionAppear: false,
  },
  blockNode: false,
}

export default Tree
