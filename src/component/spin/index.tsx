import React from 'react'
import classNames from 'classnames'
import omit from 'rc-util/lib/omit'
import { tuple } from '../_util/type'
import { isValidElement, cloneElement } from '../_util/reactNode'
import { debounce } from 'lodash'
import { prefixClsIcon } from '../_util/prefixClsIcon'
import Icon from '../icon'

const SpinSizes = tuple('small', 'default', 'large')
export type SpinSize = typeof SpinSizes[number]
export type SpinIndicator = React.ReactElement<HTMLElement>

export interface SpinProps {
  prefixCls?: string
  className?: string
  spinning?: boolean
  style?: React.CSSProperties
  size?: SpinSize
  tip?: React.ReactNode
  delay?: number
  wrapperClassName?: string
  indicator?: SpinIndicator
}

export interface SpinState {
  spinning?: boolean
  notCssAnimationSupported?: boolean
}

let defaultIndicator: React.ReactNode = null

function renderIndocator(prefixCls: string, props: SpinProps): React.ReactNode {
  const { indicator } = props
  const dotClassName = `${prefixCls}-dot`
  if (indicator === null) {
    return null
  }
  if (isValidElement(indicator)) {
    return cloneElement(indicator, {
      className: classNames(indicator.props.className, dotClassName),
    })
  }
  if (isValidElement(defaultIndicator)) {
    return cloneElement(defaultIndicator as SpinIndicator, {
      className: classNames((defaultIndicator as SpinIndicator).props.className, dotClassName),
    })
  }

  return (
    <span className={classNames(dotClassName, `${prefixCls}-dot-spin`)}>
      {prefixClsIcon(<Icon icon={'spinner'} />)}
    </span>
  )
}

function shouldDelay(spinning?: boolean, delay?: number): boolean {
  return !!spinning && !!delay && !isNaN(Number(delay))
}

class Spin extends React.Component<SpinProps, SpinState> {
  static defaultProps = {
    spinning: true,
    size: 'default' as SpinSize,
    wrapperClassName: '',
  }

  static setDefaultIndicator(indicator: React.ReactNode) {
    defaultIndicator = indicator
  }

  originalUpdateSpinning: () => void

  constructor(props: SpinProps) {
    super(props)

    const { spinning, delay } = props
    const sholdBeDelayed = shouldDelay(spinning, delay)
    this.state = {
      spinning: spinning && !sholdBeDelayed,
    }
    this.originalUpdateSpinning = this.updateSpinning
    this.debouncifyUpdateSpinning(props)
  }

  componentDidMount() {
    this.updateSpinning()
  }

  componentDidUpdate() {
    this.debouncifyUpdateSpinning()
    this.updateSpinning()
  }

  componentWillUnmount() {
    this.cancelExistingSpin()
  }

  debouncifyUpdateSpinning = (props?: SpinProps) => {
    const { delay } = props || this.props
    if (delay) {
      this.cancelExistingSpin()
      this.updateSpinning = debounce(this.originalUpdateSpinning!, delay)
    }
  }

  updateSpinning = () => {
    const { spinning } = this.props
    const { spinning: currentSpinning } = this.state
    if (currentSpinning !== spinning) {
      this.setState({ spinning })
    }
  }

  cancelExistingSpin() {
    const { updateSpinning } = this
    if (updateSpinning && (updateSpinning as any).cancel) {
      ;(updateSpinning as any).cancel()
    }
  }

  isNestedPattern() {
    return !!(this.props && typeof this.props.children !== 'undefined')
  }

  renderSpin = () => {
    const {
      prefixCls: customPrefixCls,
      className,
      size,
      tip,
      wrapperClassName,
      style,
      ...restProps
    } = this.props
    const { spinning } = this.state

    const prefixCls = customPrefixCls ?? 'st-spin'
    const spinClassName = classNames(
      prefixCls,
      {
        [`${prefixCls}-sm`]: size === 'small',
        [`${prefixCls}-lg`]: size === 'large',
        [`${prefixCls}-spinning`]: spinning,
        [`${prefixCls}-show-text`]: !!tip,
      },
      className,
    )

    const divProps = omit(restProps, ['spinning', 'delay', 'indicator'])

    const spinElement = (
      <div {...divProps} style={style} className={spinClassName}>
        {renderIndocator(prefixCls, this.props)}
        {tip ? <div className={`${prefixCls}-text`}>{tip}</div> : null}
      </div>
    )
    if (this.isNestedPattern()) {
      const containerClassName = classNames(`${prefixCls}-container`, {
        [`${prefixCls}-blur`]: spinning,
      })
      return (
        <div {...restProps} className={classNames(`${prefixCls}-nested-loading`, wrapperClassName)}>
          {spinning && <div key={'loading'}>{spinElement}</div>}
          <div className={containerClassName} key={'container'}>
            {this.props.children}
          </div>
        </div>
      )
    }
    return spinElement
  }

  render(): React.ReactNode {
    return this.renderSpin()
  }
}

export default Spin
