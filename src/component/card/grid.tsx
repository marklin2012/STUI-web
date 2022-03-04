import React from 'react'
import classNames from 'classnames'
import { CardPrefixCls } from '.'

export interface CardGridProps {
  prefixCls?: string
  className?: string
  hoverable?: boolean
  style?: React.CSSProperties
}

const Grid: React.FC<CardGridProps> = (props) => {
  const { prefixCls: customPrefixCls, className, hoverable = true, ...restProps } = props

  const prefixCls = customPrefixCls ?? CardPrefixCls
  const classString = classNames(`${prefixCls}-grid`, className, {
    [`${prefixCls}-grid-hoverable`]: hoverable,
  })

  return <div {...restProps} className={classString} />
}

export default Grid
