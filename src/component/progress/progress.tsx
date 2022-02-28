import classNames from 'classnames'
import React from 'react'
import Icon from '../icon'
import { tuple } from '../_util/type'
import Circle from './Circle'
import Line from './Line'
import Steps from './Steps'
import { validProgress } from './utils'

const ProgressTypes = tuple('line', 'circle', 'dashboard')
export type ProgressType = typeof ProgressTypes[number]
const ProgressStatuses = tuple('normal', 'exception', 'active', 'success', 'warning')
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
  isDot?: boolean // steps是否圆点样式
  direction?: 'ltr' | 'rtl'
  display?: 'out' | 'in' // Line时显示在内部还是外部
  axis?: 'vertical' | 'horizontal' // Line时垂直显示
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
    if (
      restProps.format ||
      (progressStatus !== 'exception' &&
        progressStatus !== 'success' &&
        progressStatus !== 'warning')
    ) {
      text = textFormatter(validProgress(percent), validProgress(successPercent))
    } else if (progressStatus === 'exception') {
      text = isLineType ? (
        <Icon icon={'circle-xmark'} size={'lg'} />
      ) : (
        <Icon icon={'xmark'} size={'lg'} />
      )
    } else if (progressStatus === 'success') {
      text = isLineType ? (
        <Icon icon={'circle-check'} size={'lg'} />
      ) : (
        <Icon icon={'check'} size={'lg'} />
      )
    } else if (progressStatus === 'warning') {
      text = isLineType ? (
        <Icon icon={'circle-exclamation'} size={'lg'} />
      ) : (
        <Icon icon={'exclamation'} size={'lg'} />
      )
    }

    let prefixClassName = `${prefixCls}`
    if (isLineAndVertical()) {
      prefixClassName += '-vertical'
    }
    let textName = `${prefixClassName}-text`
    if (restProps.display === 'in') {
      textName += '-in'
    }
    const textClassName = classNames(textName, {
      [`${textName}-success`]: isLineType && getProgressStatus() === 'success',
    })

    return (
      <span className={textClassName} title={typeof text === 'string' ? text : undefined}>
        {text}
      </span>
    )
  }

  const isLineAndVertical = () => type === 'line' && restProps.axis === 'vertical'

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
          isDot={restProps.isDot}
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
          width={restProps.width ?? 380}
          display={restProps.display}
          axis={restProps.axis}
          showInfo={showInfo}
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

    let prefixClsName = `${prefixCls}`
    if (isLineAndVertical()) {
      prefixClsName += '-vertical'
    }
    const classNameStr = classNames(
      prefixClsName,
      {
        [`${prefixClsName}-${
          (type === 'dashboard' && 'circle') || (restProps.steps && 'steps') || type
        }`]: true,
        [`${prefixClsName}-status-${progressStatus}`]: true,
        [`${prefixClsName}-show-info`]: showInfo,
        [`${prefixClsName}-${size}`]: size,
        [`${prefixClsName}-rtl`]: restProps.direction === 'rtl',
      },
      restProps.className,
    )

    if (isLineAndVertical()) {
      let progressStyle = {}
      progressStyle = {
        height: restProps.width ?? 380,
      } as React.CSSProperties
      return (
        <div className={classNameStr} style={progressStyle}>
          {progress}
        </div>
      )
    }

    return <div className={classNameStr}>{progress}</div>
  }

  return renderProgress()
}

export default Progress
