import React from 'react'
import classNames from 'classnames'
import { DirectionType, SizeType } from '../_util/type'

export interface ButtonGroupProps {
  size?: SizeType
  style?: React.CSSProperties
  className?: string
  prefixCls?: string
  direction?: DirectionType
}

const ButtonGroup: React.FC<ButtonGroupProps> = (props) => {
  const { prefixCls: customPrefixCls, size, className, direction, ...restProps } = props

  const prefixCls = customPrefixCls ?? 'st-btn-group'

  const classNameStr = classNames(
    prefixCls,
    {
      [`${prefixCls}-lg`]: size === 'large',
      [`${prefixCls}-sm`]: size === 'small',
      [`${prefixCls}-rtl`]: direction === 'rtl',
    },
    className,
  )

  return <div {...restProps} className={classNameStr} />
}

export default ButtonGroup
