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
    strokeWidth = 24,
    strokeColor,
    trailColor,
    prefixCls,
    children,
    isDot,
  } = props

  const current = Math.round(steps * (percent / 100))
  const stepWidth = size === 'small' ? 6 : 12
  const styleSteps = []
  let stepsPrefixCls = `${prefixCls}-steps-item`
  if (isDot) {
    stepsPrefixCls += 'Dot'
  }

  for (let i = 0; i < steps; i++) {
    styleSteps.push(
      <div
        key={i}
        className={classNames(stepsPrefixCls, {
          [`${stepsPrefixCls}-active`]: i <= current - 1,
        })}
        style={{
          backgroundColor: i <= current - 1 ? strokeColor : trailColor,
          width: stepWidth,
          height: isDot ? stepWidth : strokeWidth,
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
