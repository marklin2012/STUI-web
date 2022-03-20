import React from 'react'
import CSSMotion from 'rc-motion'
import Icon from '../icon'

export interface LoadingIconProps {
  prefixCls: string
  existIcon: boolean
  loading?: boolean | object
}

const getCollapsedWith = () => ({ width: 0, opacity: 0, transform: 'scale(0)' })
const getRealWith = (node: HTMLElement) => ({
  width: node.scrollWidth,
  opacity: 1,
  transform: 'scale(1)',
})

const LoadingIcon: React.FC<LoadingIconProps> = ({ prefixCls, loading, existIcon }) => {
  const visible = !!loading

  if (existIcon) {
    return (
      <span className={`${prefixCls}-loading-icon`}>
        <Icon icon={'spinner'} />
      </span>
    )
  }

  return (
    <CSSMotion
      visible={visible}
      motionName={`${prefixCls}-loading-icon-motion`}
      removeOnLeave
      onAppearStart={getCollapsedWith}
      onAppearActive={getRealWith}
      onEnterStart={getCollapsedWith}
      onEnterActive={getRealWith}
      onLeaveStart={getCollapsedWith}
      onLeaveActive={getRealWith}
    >
      {({ className, style }: { className?: string; style?: React.CSSProperties }, ref: any) => (
        <span className={`${prefixCls}-loading-icon`} style={style} ref={ref}>
          <Icon icon={'spinner'} className={className} />
        </span>
      )}
    </CSSMotion>
  )
}

export default LoadingIcon
