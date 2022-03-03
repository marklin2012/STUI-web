import React from 'react'
import RcCollapse from 'rc-collapse'
import classNames from 'classnames'

export type CollapsibleType = 'header' | 'disabled'

export interface CollapsePanelProps {
  key: string | number
  header: React.ReactNode
  className?: string
  style?: React.CSSProperties
  showArrow?: boolean
  prefixCls?: string
  forceRender?: boolean
  id?: string
  extra?: React.ReactNode
  collapsible?: CollapsibleType
}

const collapseCls = 'st-collapse'

const CollapsePanel: React.FC<CollapsePanelProps> = (props) => {
  const { prefixCls: customPrefixCls, className = '', showArrow = true } = props
  const prefixCls = customPrefixCls ?? collapseCls
  const collapsePanelCls = classNames(
    {
      [`${prefixCls}-no-arrow`]: !showArrow,
    },
    className,
  )
  return <RcCollapse.Panel {...props} prefixCls={prefixCls} className={collapsePanelCls} />
}

export default CollapsePanel
