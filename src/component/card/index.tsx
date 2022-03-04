import classNames from 'classnames'
import { map } from 'lodash'
import React from 'react'
import { DirectionType, Omit } from '../_util/type'
import Grid from './grid'
import Meta from './meta'
import './style'

export const CardPrefixCls = 'st-card'

interface CardProps {
  prefixCls?: string
  className?: string
  id?: string
  actions?: React.ReactNode[] // 底部的操作组
  style?: React.CSSProperties
  bodyStyle?: React.CSSProperties // 内容区域自定义样式
  bordered?: boolean // 是否有边框
  cover?: React.ReactNode // 卡片的封面 背景图片
  extra?: React.ReactNode // head右上角的操作
  headStyle?: React.CSSProperties /// 头部区域自定义样式
  hoverable?: boolean // grid时的hover状态
  girdType?: 'inner' | undefined // gird的类型
  title?: React.ReactNode
  direction?: DirectionType
}

interface STCardCompounded extends React.FC<CardProps> {
  Grid: typeof Grid
  Meta: typeof Meta
}

const Card: STCardCompounded = (props) => {
  const {
    prefixCls: customPrefixCls,
    className,
    actions,
    bodyStyle,
    bordered = true,
    cover,
    extra,
    headStyle,
    hoverable,
    girdType,
    title,
    direction,
    children,
    ...restProps
  } = props

  const prefixCls = customPrefixCls ?? CardPrefixCls

  const isContainGrid = () => {
    let containGrid
    React.Children.forEach(props.children as JSX.Element, (element: JSX.Element) => {
      if (element && element.type && element.type === Grid) {
        containGrid = true
      }
    })
    return containGrid
  }

  let headRender: React.ReactNode
  if (title || extra) {
    headRender = (
      <div className={`${prefixCls}-head`} style={headStyle}>
        <div className={`${prefixCls}-head-wrapper`}>
          {title && <div className={`${prefixCls}-head-title`}>{title}</div>}
          {extra && <div className={`${prefixCls}-extra`}>{extra}</div>}
        </div>
      </div>
    )
  }

  const coverRender = cover ? <div className={`${prefixCls}-cover`}>{cover}</div> : null
  const bodyRender = (
    <div className={`${prefixCls}-body`} style={bodyStyle}>
      {children}
    </div>
  )

  const actionRender =
    actions && actions.length ? (
      <ul className={`${prefixCls}-actions`}>{getAction(actions)}</ul>
    ) : null

  const classNameStr = classNames(
    prefixCls,
    {
      [`${prefixCls}-bordered`]: bordered,
      [`${prefixCls}-hoverable`]: hoverable,
      [`${prefixCls}-contain-grid`]: isContainGrid(),
      [`${prefixCls}-type-${girdType}`]: !!girdType,
      [`${prefixCls}-rtl`]: direction === 'rtl',
    },
    className,
  )

  return (
    <div {...restProps} className={classNameStr}>
      {headRender}
      {coverRender}
      {bodyRender}
      {actionRender}
    </div>
  )

  function getAction(actions: React.ReactNode[]) {
    const actionsListRender = map(actions, (action, index) => {
      return (
        <li style={{ width: `${100 / actions.length}%` }} key={`action-${index}`}>
          <span>{action}</span>
        </li>
      )
    })
    return actionsListRender
  }
}

Card.Grid = Grid
Card.Meta = Meta

export default Card
