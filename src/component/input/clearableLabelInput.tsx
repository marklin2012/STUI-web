import classNames from 'classnames'
import React, { cloneElement } from 'react'
import Icon from '../icon'
import { DirectionType, SizeType, tuple } from '../_util/type'
import { InputProps } from './input'
import { getInputClassName, hasPrefixSuffix } from './untils'
import './style'

const ClearableInputType = tuple('text', 'input')

function hasAddon(props: InputProps | ClearableInputProps) {
  return !!(props.addonBefore || props.addonAfter)
}

interface BasicProps {
  prefixCls: string
  className?: string
  inputType: typeof ClearableInputType[number]
  value?: any
  allowClear?: boolean
  element: React.ReactElement
  handleReset: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
  style?: React.CSSProperties
  disabled?: boolean
  direction?: DirectionType
  focused?: boolean
  readOnly?: boolean
  bordered: boolean
  hidden?: boolean
}

export interface ClearableInputProps extends BasicProps {
  size?: SizeType
  suffix?: React.ReactNode
  prefix?: React.ReactNode
  addonBefore?: React.ReactNode
  addonAfter?: React.ReactNode
  triggerFocus?: () => void
}

class ClearableLabeledInput extends React.Component<ClearableInputProps> {
  private containerRef = React.createRef<HTMLSpanElement>()

  onInputMouseUp: React.MouseEventHandler = (e) => {
    if (this.containerRef.current?.contains(e.target as Element)) {
      const { triggerFocus } = this.props
      triggerFocus?.()
    }
  }

  renderClearIcon(prefixCls: string) {
    const { allowClear, value, disabled, readOnly, handleReset, suffix } = this.props

    if (!allowClear) return
    const needClear = !disabled && !readOnly && value
    const className = `${prefixCls}-clear-icon`
    return (
      <span
        onClick={handleReset}
        onMouseDown={(e) => e.preventDefault()}
        className={classNames(
          {
            [`${className}-hidden`]: !needClear,
            [`${className}-has-suffix`]: !!suffix,
          },
          className,
        )}
        role="button"
      >
        <Icon icon={'circle-xmark'} color={'#C4C5C7'} />
      </span>
    )
  }

  renderSuffix(prefixCls: string) {
    const { suffix, allowClear } = this.props
    if (suffix || allowClear) {
      return (
        <span className={`${prefixCls}-suffix`}>
          {this.renderClearIcon(prefixCls)}
          {suffix}
        </span>
      )
    }
    return null
  }

  renderLabeledIcon(prefixCls: string, element: React.ReactElement) {
    const {
      focused,
      value,
      prefix,
      className,
      size,
      suffix,
      disabled,
      allowClear,
      direction,
      style,
      readOnly,
      bordered,
      hidden,
    } = this.props

    if (!hasPrefixSuffix(this.props)) {
      return cloneElement(element, { value })
    }

    const suffixNode = this.renderSuffix(prefixCls)
    const prefixNode = prefix ? <span className={`${prefixCls}-prefix`}>{prefix}</span> : null
    const affixWrapperCls = classNames(`${prefixCls}-affix-wrapper`, {
      [`${prefixCls}-affix-wrapper-focused`]: focused,
      [`${prefixCls}-affix-wrapper-disabled`]: disabled,
      [`${prefixCls}-affix-wrapper-sm`]: size === 'small',
      [`${prefixCls}-affix-wrapper-lg`]: size === 'large',
      [`${prefixCls}-affix-wrapper-input-with-clear-btn`]: suffix && allowClear && value,
      [`${prefixCls}-affix-wrapper-rtl`]: direction === 'rtl',
      [`${prefixCls}-affix-wrapper-readonly`]: readOnly,
      [`${prefixCls}-affix-wrapper-borderless`]: !bordered,
      // className will go to addon wrapper
      [`${className}`]: !hasAddon(this.props) && className,
    })
    return (
      <span
        ref={this.containerRef}
        className={affixWrapperCls}
        style={style}
        onMouseUp={this.onInputMouseUp}
        hidden={hidden}
      >
        {prefixNode}
        {cloneElement(element, {
          style: null,
          value,
          className: getInputClassName(prefixCls, bordered, size, disabled),
        })}
        {suffixNode}
      </span>
    )
  }

  renderInputWithLabel(prefixCls: string, labeledElement: React.ReactElement) {
    const { addonBefore, addonAfter, style, size, className, direction, hidden } = this.props

    if (!hasAddon(this.props)) {
      return labeledElement
    }

    const wrapperClassName = `${prefixCls}-group`
    const addonClassName = `${wrapperClassName}-addon`
    const addonBeforeNode = addonBefore ? (
      <span className={addonClassName}>{addonBefore}</span>
    ) : null
    const addonAfterNode = addonAfter ? <span className={addonClassName}>{addonAfter}</span> : null

    const mergedWrapperClassName = classNames(`${prefixCls}-wrapper`, wrapperClassName, {
      [`${wrapperClassName}-rtl`]: direction === 'rtl',
    })

    const mergedGroupClassName = classNames(
      `${prefixCls}-group-wrapper`,
      {
        [`${prefixCls}-group-wrapper-sm`]: size === 'small',
        [`${prefixCls}-group-wrapper-lg`]: size === 'large',
        [`${prefixCls}-group-wrapper-rtl`]: direction === 'rtl',
      },
      className,
    )

    return (
      <span className={mergedGroupClassName} style={style} hidden={hidden}>
        <span className={mergedWrapperClassName}>
          {addonBeforeNode}
          {cloneElement(labeledElement, { style: null })}
          {addonAfterNode}
        </span>
      </span>
    )
  }

  renderTextAreaWithClearIcon(prefixCls: string, element: React.ReactElement) {
    const { value, allowClear, className, style, direction, bordered, hidden } = this.props
    if (!allowClear) {
      return cloneElement(element, { value })
    }
    const affixWrapperCls = classNames(
      `${prefixCls}-affix-wrapper`,
      `${prefixCls}-affix-wrapper-textarea-with-clear-btn`,
      {
        [`${prefixCls}-affix-wrapper-rtl`]: direction === 'rtl',
        [`${prefixCls}-affix-wrapper-borderless`]: !bordered,
        [`${className}`]: !hasAddon(this.props) && className,
      },
    )
    return (
      <span className={affixWrapperCls} style={style} hidden={hidden}>
        {cloneElement(element, {
          style: null,
          value,
        })}
        {this.renderClearIcon(prefixCls)}
      </span>
    )
  }

  render() {
    const { prefixCls, inputType, element } = this.props
    if (inputType === ClearableInputType[0]) {
      return this.renderTextAreaWithClearIcon(prefixCls, element)
    }
    return this.renderInputWithLabel(prefixCls, this.renderLabeledIcon(prefixCls, element))
  }
}

export default ClearableLabeledInput
