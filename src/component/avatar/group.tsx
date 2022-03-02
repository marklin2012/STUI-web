import classNames from 'classnames'
import * as React from 'react'
import toArray from 'rc-util/lib/Children/toArray'
import { cloneElement } from '../_util/reactNode'
import { DirectionType } from '../_util/type'
import { AvatarSize, SizeContextProvider } from './sizeContext'
import Popover from '../popover'
import Avatar from './avatar'

export interface GroupProps {
  className?: string
  children?: React.ReactNode
  style?: React.CSSProperties
  maxCount?: number
  maxStyle?: React.CSSProperties
  maxPopoverPlacement?: 'top' | 'bottom'
  maxPopoverTrigger?: 'hover' | 'focus' | 'click'
  size?: AvatarSize
  direction?: DirectionType
}

const prefixCls = 'st-avatar-group'

const Group: React.FC<GroupProps> = (props) => {
  const {
    direction,
    className,
    children,
    maxCount,
    maxStyle,
    size = 'default',
    maxPopoverPlacement = 'top',
    maxPopoverTrigger = 'hover',
  } = props

  const cls = classNames(
    prefixCls,
    {
      [`${prefixCls}-rtl`]: direction === 'rtl',
    },
    className,
  )

  const childrenWithProps = toArray(children).map((child, index) => {
    return cloneElement(child, {
      key: `avatar-key-${index}`,
    })
  })

  const numOfChildren = childrenWithProps.length
  if (maxCount && maxCount < numOfChildren) {
    const childrenShow = childrenWithProps.slice(0, maxCount)
    const childrenHidden = childrenWithProps.slice(maxCount, numOfChildren)

    childrenShow.push(
      <Popover
        key={'avatar-popover-key'}
        content={childrenHidden}
        trigger={maxPopoverTrigger}
        placement={maxPopoverPlacement}
        overlayClassName={`${prefixCls}-popover`}
        color="white"
      >
        <Avatar style={maxStyle}>{`+${numOfChildren - maxCount}`}</Avatar>
      </Popover>,
    )
    return (
      <SizeContextProvider size={size}>
        <div className={cls} style={props.style}>
          {childrenShow}
        </div>
      </SizeContextProvider>
    )
  }

  return (
    <SizeContextProvider size={size}>
      <div className={cls} style={props.style}>
        {childrenWithProps}
      </div>
    </SizeContextProvider>
  )
}

export default Group
