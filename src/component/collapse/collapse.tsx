import React from 'react'
import RcCollapse from 'rc-collapse'
import CollapsePanel, { CollapsibleType } from './collapsePanel'
import { DirectionType } from '../_util/type'
import Icon from '../icon'
import { cloneElement } from '../_util/reactNode'
import classNames from 'classnames'
import { CSSMotionProps } from 'rc-motion'
import collapseMotion from '../_util/motion'
import toArray from 'rc-util/lib/Children/toArray'
import omit from 'rc-util/lib/omit'
import './style'
import { prefixClsIcon } from '../_util/prefixClsIcon'

export type ExpandIconPosition = 'left' | 'right' | undefined

export type CollapseChangeHandle = (key: React.Key | React.Key[]) => void

interface PanelProps {
  isActive?: boolean // 是否激活
  header?: React.ReactNode // 面板头内容
  className?: string
  style?: React.CSSProperties
  showArrow?: boolean // 是否显示箭头
  forceRender?: boolean // 隐藏时是否强制渲染
  extra?: React.ReactNode // 自定义内容
  collapsible?: CollapsibleType // 当前面板是否可折叠
}

export interface CollapseProps {
  activeKey?: Array<React.Key> | string | number // 当前激活的面板
  defaultActiveKey?: Array<React.Key> | string | number // 初始化选中的面板
  accordion?: boolean // 手风琴模式
  destroyInactivePanel?: boolean // 销毁折叠隐藏的面板
  onChange?: CollapseChangeHandle // 切换面板的回调
  style?: React.CSSProperties
  className?: string
  bordered?: boolean // 边框风格模式
  prefixCls?: string
  expandIcon?: (panelProps: PanelProps) => React.ReactNode // 自定义切换的图标
  expandIconPosition?: ExpandIconPosition // 设置图标的位置
  ghost?: boolean // 幽灵模式
  collapsible?: CollapsibleType // 所有面板是否可折叠
  direction?: DirectionType
}

interface CollapseInterface extends React.FC<CollapseProps> {
  Panel: typeof CollapsePanel
}

const CollapseCls = 'st-collapse'

const Collapse: CollapseInterface = (props) => {
  const {
    prefixCls: customCls,
    className = '',
    bordered = true,
    ghost,
    direction,
    expandIconPosition,
    expandIcon,
    children,
  } = props
  const prefixCls = customCls ?? CollapseCls

  const getIconPosition = () => {
    if (expandIconPosition !== undefined) {
      return expandIconPosition
    }
    return direction === 'rtl' ? 'right' : 'left'
  }

  const renderExpandIcon = (panelProps: PanelProps = {}) => {
    const defaultIcon = panelProps.isActive
      ? prefixClsIcon(<Icon icon={'angle-down'} />)
      : prefixClsIcon(<Icon icon={'angle-right'} />)
    const icon = (expandIcon ? expandIcon(panelProps) : defaultIcon) as React.ReactNode

    return (
      <div>
        {cloneElement(icon, () => ({
          className: classNames((icon as any).props.className, `${prefixCls}-arrow`),
        }))}
      </div>
    )
  }

  const iconPositon = getIconPosition()
  const collapseClsName = classNames(
    {
      [`${prefixCls}-borderless`]: !bordered,
      [`${prefixCls}-icon-position-${iconPositon}`]: true,
      [`${prefixCls}-rtl`]: direction === 'rtl',
      [`${prefixCls}-ghost`]: !!ghost,
    },
    className,
  )

  const openMotion: CSSMotionProps = {
    ...collapseMotion,
    motionAppear: false,
    leavedClassName: `${prefixCls}-content-hidden`,
  }

  const getItems = () => {
    return toArray(children).map((child: React.ReactElement, index: number) => {
      if (child.props?.collapsible) {
        const key = child.key || String(index)
        const { collapsible } = child.props
        const childProps: CollapseProps & { key: React.Key } = {
          ...omit(child.props, ['collapsible']),
          key,
          collapsible: collapsible ?? 'header',
        }
        return cloneElement(child, childProps)
      }
      return child
    })
  }

  return (
    <RcCollapse
      openMotion={openMotion}
      {...props}
      expandIcon={renderExpandIcon}
      prefixCls={prefixCls}
      className={collapseClsName}
    >
      {getItems()}
    </RcCollapse>
  )
}

Collapse.Panel = CollapsePanel

export default Collapse
