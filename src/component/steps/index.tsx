import React from 'react'
import RcSteps from 'rc-steps'
import type { ProgressDotRender } from 'rc-steps/lib/Steps'
import type { Status as StepsStatus } from 'rc-steps/lib/interface'
import classNames from 'classnames'
import Progress from '../progress'
import userBreakpoint from '../_util/hooks/useBreakpoint'
import { prefixClsIcon } from '../_util/prefixClsIcon'
import Icon from '../icon'

export interface StepsProps {
  type?: 'default' | 'navigation'
  className?: string
  current?: number
  direction?: 'horizontal' | 'vertical'
  iconPrefix?: string
  initial?: number
  labelPlacement?: 'horizontal' | 'vertical'
  prefixCls?: string
  progressDot?: boolean | ProgressDotRender
  responsive?: boolean
  size?: 'default' | 'small'
  status?: StepsStatus
  style?: React.CSSProperties
  percent?: number
  onChange?: (current: number) => void
}

export type { StepsStatus }

export interface stepProps {
  className?: string
  description?: React.ReactNode
  icon?: React.ReactNode
  onClick?: React.MouseEventHandler<HTMLElement>
  status?: StepsStatus
  disabled?: boolean
  title?: React.ReactNode
  subTitle?: React.ReactNode
  style?: React.CSSProperties
}

interface StepsType extends React.FC<StepsProps> {
  Step: typeof RcSteps.Step
}

const Steps: StepsType = (props) => {
  const { percent, size, className, direction, responsive, ...restProps } = props

  const { xs } = userBreakpoint(responsive)

  const getDirection = React.useCallback(
    () => (responsive && xs ? 'vertical' : direction),
    [xs, direction],
  )

  const prefixCls = props.prefixCls ?? 'st-steps'
  const iconPrefix = props.iconPrefix ?? ''
  const stepsClassName = classNames(
    {
      [`${prefixCls}-with-progress`]: percent !== undefined,
    },
    className,
  )

  const icons = {
    finish: prefixClsIcon(<Icon icon={'check'} />, `${prefixCls}-finish-icon`),
    error: prefixClsIcon(<Icon icon={'xmark'} />, `${prefixCls}-error-icon`),
  }

  const stepIconRender = ({
    node,
    status,
  }: {
    node: React.ReactNode
    index: number
    status: string
    title: string | React.ReactNode
    description: string | React.ReactNode
  }) => {
    if (status === 'process' && percent !== undefined) {
      const progressWith = size === 'small' ? 32 : 40
      const iconWithProgress = (
        <div className={`${prefixCls}-progress-icon`}>
          <Progress
            type="circle"
            percent={percent}
            width={progressWith}
            strokeWidth={4}
            format={() => null}
          />
          {node}
        </div>
      )
      return iconWithProgress
    }
    return node
  }

  return (
    <RcSteps
      icons={icons}
      {...restProps}
      size={size}
      direction={getDirection()}
      stepIcon={stepIconRender}
      prefixCls={prefixCls}
      iconPrefix={iconPrefix}
      className={stepsClassName}
    />
  )
}

Steps.Step = RcSteps.Step

Steps.defaultProps = {
  current: 0,
  responsive: true,
}

export default Steps
