import { ProgressProps, SuccessProps } from './progress'
import React from 'react'
import { validProgress } from './utils'
import classNames from 'classnames'
import { Circle as RCCircle } from 'rc-progress'

interface CircleProps extends ProgressProps {
  progressStatus: string
}

function getPercentage(percent: number | undefined, success: SuccessProps | undefined) {
  const realSuccessPercent = validProgress(success?.percent)
  return [realSuccessPercent, validProgress(validProgress(percent) - realSuccessPercent)]
}

function getStrokeColor({
  success = {},
  strokeColor,
}: Partial<CircleProps>): (string | Record<string, string>)[] {
  const { strokeColor: successColor } = success
  return [successColor || 'green', strokeColor || null!] /// MarkDown
}

const Circle: React.FC<CircleProps> = (props) => {
  const {
    prefixCls,
    width,
    strokeWidth,
    strokeColor,
    trailColor,
    strokeLinecap,
    gapPositon,
    gapDegree,
    type,
    children,
    percent,
    success,
  } = props

  const circleSize = width || 120
  const circleStyle = {
    width: circleSize,
    height: circleSize,
    fontSize: circleSize * 0.15 + 6,
  } as React.CSSProperties
  const circleWidth = strokeWidth || 6
  const gapPos = gapPositon || (type === 'dashboard' && 'bottom') || 'top'

  const getGapDegree = () => {
    if (gapDegree || gapDegree === 0) {
      return gapDegree
    }
    if (type === 'dashboard') {
      return 75
    }
    return undefined
  }
  /// MarkDown
  const isGradient = Object.prototype.toString.call(strokeColor) === '[object object]'
  const realStrokeColor = getStrokeColor({ success, strokeColor: strokeColor })

  const wrapperClassName = classNames(`${prefixCls}-inner`, {
    [`${prefixCls}-circle-gradient`]: isGradient,
  })

  return (
    <div className={wrapperClassName} style={circleStyle}>
      <RCCircle
        percent={getPercentage(percent, success)}
        strokeWidth={circleWidth}
        trailWidth={circleWidth}
        strokeColor={realStrokeColor}
        strokeLinecap={strokeLinecap}
        trailColor={trailColor}
        prefixCls={prefixCls}
        gapDegree={getGapDegree()}
        gapPosition={gapPos}
      />
      {children}
    </div>
  )
}

export default Circle
