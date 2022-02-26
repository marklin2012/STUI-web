import classNames from 'classnames'
import React, { Children } from 'react'
import { tuple } from '../_util/type'
import Circle from './Circle'
import Line from './Line'
import Steps from './Steps'
import { validProgress } from './utils'
import './style'

const ProgressTypes = tuple('line', 'circle', 'dashboard')
export type ProgressType = typeof ProgressTypes[number]
const ProgressStatuses = tuple('normal', 'exception', 'active', 'success')
export type ProgressSize = 'default' | 'small'
export type StringGradients = { [percentage: string]: string }
type FromToGradients = { from: string; to: string }
export type ProgressGradient = { direction?: string } & (StringGradients | FromToGradients)

export interface SuccessProps {
  percent?: number
  strokeColor?: string
}

export interface ProgressProps {
  prefixCls?: string
  className?: string
  type?: ProgressType
  percent?: number
  format?: (percent?: number, successPercent?: number) => React.ReactNode
  status?: typeof ProgressStatuses[number]
  showInfo?: boolean
  strokeWidth?: number
  strokeLinecap?: 'butt' | 'square' | 'round'
  strokeColor?: string | ProgressGradient
  trailColor?: string // 未完成部分的颜色
  width?: number // 圆形或者仪表盘的宽度
  success?: SuccessProps
  style?: React.CSSProperties
  gapDegree?: number // 仪表盘进度条缺口角度
  gapPositon?: 'top' | 'bottom' | 'left' | 'right' // 仪表盘进度条缺口方向
  size?: ProgressSize
  steps?: number // 线条进度条总共的条数
  direction?: 'ltr' | 'rtl'
}

const prefixCls = 'st-progress'

const Progress: React.FC<ProgressProps> = ({
  type = 'line' as ProgressProps['type'],
  percent = 0,
  showInfo = true,
  size = 'default' as ProgressProps['size'],
  strokeLinecap = 'round' as ProgressProps['strokeLinecap'],
  success,
  ...restProps
}) => {
  const getPercentNumber = () => {
    const successPercent = success?.percent
    return parseInt(successPercent !== undefined ? successPercent.toString() : percent.toString())
  }

  const getProgressStatus = () => {
    const status = restProps.status
    if (ProgressStatuses.indexOf(status!) < 0 && getPercentNumber() >= 100) {
      return 'success'
    }
    return status || 'normal'
  }

  const renderProcessInfo = (
    prefixCls: string,
    progressStatus: typeof ProgressStatuses[number],
  ) => {
    const successPercent = success?.percent
    if (!showInfo) {
      return null
    }
    let text
    const textFormatter = restProps.format || ((percentNumber) => `${percentNumber}%`)
    const isLineType = type === 'line'
    if (restProps.format || (progressStatus !== 'exception' && progressStatus !== 'success')) {
      text = textFormatter(validProgress(percent), validProgress(successPercent))
    } else if (progressStatus === 'exception') {
      text = isLineType ? <span>el</span> : <span>eol</span>
    } else if (progressStatus === 'success') {
      text = isLineType ? <span>sl</span> : <span>sol</span>
    }

    return (
      <span className={`${prefixCls}-text`} title={typeof text === 'string' ? text : undefined}>
        {text}
      </span>
    )
  }

  const renderProgress = () => {
    const progressStatus = getProgressStatus()
    const progressInfo = renderProcessInfo(prefixCls, progressStatus)
    const strokeColor = restProps.strokeColor

    let progress
    if (type === 'line') {
      progress = restProps.steps ? (
        <Steps
          prefixCls={prefixCls}
          steps={restProps.steps}
          percent={percent}
          success={success}
          size={size}
          strokeWidth={restProps.strokeWidth}
          strokeColor={typeof strokeColor === 'string' ? strokeColor : undefined}
          trailColor={restProps.trailColor}
        >
          {progressInfo}
        </Steps>
      ) : (
        <Line
          prefixCls={prefixCls}
          direction={restProps.direction}
          percent={percent}
          success={success}
          strokeColor={strokeColor}
          strokeLinecap={strokeLinecap}
          status={restProps.status}
          trailColor={restProps.trailColor}
          strokeWidth={restProps.strokeWidth}
          size={size}
        >
          {progressInfo}
        </Line>
      )
    } else if (type === 'circle' || type === 'dashboard') {
      progress = (
        <Circle
          prefixCls={prefixCls}
          strokeWidth={restProps.strokeWidth}
          width={restProps.width}
          strokeColor={strokeColor}
          trailColor={restProps.trailColor}
          strokeLinecap={strokeLinecap}
          gapDegree={restProps.gapDegree}
          gapPositon={restProps.gapPositon}
          type={type}
          success={success}
          percent={percent}
          progressStatus={progressStatus}
        >
          {progressInfo}
        </Circle>
      )
    }

    const classNameStr = classNames(
      prefixCls,
      {
        [`${prefixCls}-${
          (type === 'dashboard' && 'circle') || (restProps.steps && 'steps') || type
        }`]: true, /// MarkDown
        [`${prefixCls}-status-${progressStatus}`]: true,
        [`${prefixCls}-show-info`]: showInfo,
        [`${prefixCls}-${size}`]: size,
        [`${prefixCls}-rtl`]: restProps.direction === 'rtl',
      },
      restProps.className,
    )

    return <div className={classNameStr}>{progress}</div>
  }

  return renderProgress()
}

export default Progress
