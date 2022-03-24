import React from 'react'
import classNames from 'classnames'
import RcTabs, { TabPane, TabsProps as RcTabsProps, TabPaneProps } from 'rc-tabs'
import { EditableConfig } from 'rc-tabs/lib/interface'
import { SizeType } from '../_util/type'
import Icon from '../icon'
import { prefixClsIcon } from '../_util/prefixClsIcon'

export type TabsType = 'line' | 'card' | 'editable-card'
export type TabsPosition = 'top' | 'right' | 'bottom' | 'left'

export type { TabPaneProps }

export type OnEditHandle = (
  e: React.MouseEvent | React.KeyboardEvent | string,
  action: 'add' | 'remove',
) => void

export interface TabsProps extends Omit<RcTabsProps, 'editable'> {
  type?: TabsType
  size?: SizeType
  hideAdd?: boolean
  centered?: boolean
  addIcon?: React.ReactNode
  onEdit?: OnEditHandle
}

function Tabs({
  type,
  prefixCls: customPrefixCls,
  className,
  size: customSize,
  hideAdd,
  centered,
  addIcon,
  moreIcon = prefixClsIcon(<Icon icon={'bars'} />),
  onEdit,
  ...restProps
}: TabsProps) {
  const rootPrefixCls = 'st'
  const prefixCls = customPrefixCls ?? 'st-tabs'
  const size = customSize ?? 'middle'

  let editable: EditableConfig | undefined
  if (type === 'editable-card') {
    editable = {
      onEdit: (editType, { key, event }) => {
        onEdit?.(editType === 'add' ? event : key!, editType)
      },
      removeIcon: prefixClsIcon(<Icon icon={'circle-xmark'} />),
      addIcon: addIcon || prefixClsIcon(<Icon icon={'plus'} />),
      showAdd: hideAdd !== true,
    }
  }

  const classNameString = classNames(
    {
      [`${prefixCls}-${size}`]: size,
      [`${prefixCls}-card`]: ['card', 'editable-card'].includes(type as string),
      [`${prefixCls}-editable-card`]: type === 'editable-card',
      [`${prefixCls}-centered`]: centered,
    },
    className,
  )

  return (
    <RcTabs
      moreTransitionName={`${rootPrefixCls}-slide-up`}
      {...restProps}
      className={classNameString}
      editable={editable}
      moreIcon={moreIcon}
      prefixCls={prefixCls}
    />
  )
}

Tabs.TabPane = TabPane

export default Tabs
