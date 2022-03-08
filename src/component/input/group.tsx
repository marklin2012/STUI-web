import classNames from 'classnames'
import React from 'react'
import { DirectionType } from '../_util/type'
import './style'

export interface GroupProps {
  prefixCls?: string
  className?: string
  compact?: boolean // 是否紧凑贴合的
  size?: 'large' | 'default' | 'small'
  style?: React.CSSProperties
  onMouseEnter?: React.MouseEventHandler<HTMLSpanElement>
  onMouseLeave?: React.MouseEventHandler<HTMLSpanElement>
  onFoucs?: React.FocusEventHandler<HTMLSpanElement>
  onBlur?: React.FocusEventHandler<HTMLSpanElement>
  direction?: DirectionType
}

const GroupPrefixCls = 'st-input-group'

const Group: React.FC<GroupProps> = (props) => {
  const {
    prefixCls: customPrefixCls,
    className = '',
    compact,
    size = 'default',
    direction,
    children,
    ...restProps
  } = props

  const prefixCls = customPrefixCls ?? GroupPrefixCls
  const clsName = classNames(
    prefixCls,
    {
      [`${prefixCls}-lg`]: size === 'large',
      [`${prefixCls}-sm`]: size === 'small',
      [`${prefixCls}-compact`]: compact,
      [`${prefixCls}-rtl`]: direction === 'rtl',
    },
    className,
  )

  return (
    <span
      className={clsName}
      style={restProps.style}
      onMouseEnter={restProps.onMouseEnter}
      onMouseLeave={restProps.onMouseLeave}
      onFocus={restProps.onFoucs}
      onBlur={restProps.onBlur}
    >
      {children}
    </span>
  )
}

export default Group
