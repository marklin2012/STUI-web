import { ProgressProps, ProgressSize } from './progress'
import React from 'react'
import classNames from 'classnames'

interface StepsProps extends ProgressProps {
  steps: number
  size?: ProgressSize
  strokeColor?: string
  trailColor?: string
}

const Steps: React.FC<StepsProps> = (props) => {
  const {
    size,
    steps,
    percent = 0,
    strokeWidth = 8,
    strokeColor,
    trailColor,
    prefixCls,
    children,
  } = props

  const current = Math.round(steps * (percent / 100))
  const stepWidth = size === 'small' ? 2 : 14
  const styleSteps = []

  for (let i = 0; i < steps; i++) {
    styleSteps.push(
      <div
        key={i}
        className={classNames(`${prefixCls}-steps-item`, {
          [`${prefixCls}-steps-item-active`]: i <= current - 1,
        })}
        style={{
          backgroundColor: i <= current - 1 ? strokeColor : trailColor,
          width: stepWidth,
          height: strokeWidth,
        }}
      />,
    )
  }
  return (
    <div className={`${prefixCls}-steps-outer`}>
      {styleSteps}
      {children}
    </div>
  )
}

export default Steps
