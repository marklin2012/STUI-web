import classNames from 'classnames'
import omit from 'rc-util/lib/omit'
import React from 'react'
import { DirectionType, LiteralUnion, SizeType } from '../_util/type'
import ClearableLabeledInput from './clearableLabelInput'
import Group from './group'
import Password from './password'
import Search from './search'
import TextArea from './textArea'
import { getInputClassName, hasPrefixSuffix } from './untils'
import './style'

export interface InputFocusOptions extends FocusOptions {
  cursor?: 'start' | 'end' | 'all'
}

export interface ShowCountProps {
  formatter: (args: { count: number; maxLength?: number }) => React.ReactNode
}

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix' | 'type'> {
  prefixCls?: string
  id?: string
  size?: SizeType
  type?: LiteralUnion<
    | 'button'
    | 'checkbox'
    | 'color'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'file'
    | 'hidden'
    | 'image'
    | 'month'
    | 'number'
    | 'password'
    | 'radio'
    | 'range'
    | 'reset'
    | 'search'
    | 'submit'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week',
    string
  >
  onPressEnter?: React.KeyboardEventHandler<HTMLInputElement>
  addonBefore?: React.ReactNode
  addonAfter?: React.ReactNode
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  allowClear?: boolean
  showCount?: boolean | ShowCountProps
  bordered?: boolean
  htmlSize?: number
  defaultValue?: string
  disabled?: boolean
  direction?: DirectionType
}

export interface InputState {
  value: any
  focused: boolean
  prevValue: any
}

export function fixControlledValue<T>(value: T) {
  if (typeof value === 'undefined' || value === null) {
    return ''
  }
  return String(value)
}

export function resolveOnChange<E extends HTMLInputElement | HTMLTextAreaElement>(
  target: E,
  e:
    | React.ChangeEvent<E>
    | React.MouseEvent<HTMLElement, MouseEvent>
    | React.CompositionEvent<HTMLElement>,
  onChange: undefined | ((event: React.ChangeEvent<E>) => void),
  targetValue?: string,
) {
  if (!onChange) {
    return
  }
  let event = e
  if (e.type === 'click') {
    const currentTarget = target.cloneNode(true) as E
    event = Object.create(e, {
      target: { value: currentTarget },
      currentTarget: { value: currentTarget },
    })
    currentTarget.value = ''
    onChange(event as React.ChangeEvent<E>)
    return
  }

  if (targetValue !== undefined) {
    event = Object.create(e, {
      target: { value: target },
      currentTarget: { value: target },
    })
    target.value = targetValue
    onChange(event as React.ChangeEvent<E>)
    return
  }
  onChange(event as React.ChangeEvent<E>)
}

export function triggerFocus(
  element?: HTMLInputElement | HTMLTextAreaElement,
  option?: InputFocusOptions,
) {
  if (!element) return
  element.focus(option)
  const { cursor } = option || {}
  if (cursor) {
    const len = element.value.length
    switch (cursor) {
      case 'start':
        element.setSelectionRange(0, 0)
        break
      case 'end':
        element.setSelectionRange(len, len)
        break
      default:
        element.setSelectionRange(0, len)
    }
  }
}

export const InputPrefixCls = 'st-input'

class Input extends React.Component<InputProps, InputState> {
  static Group: typeof Group

  static Search: typeof Search

  static TextArea: typeof TextArea

  static Password: typeof Password

  static defaultProps = {
    type: 'text',
  }
  input!: HTMLInputElement
  clearableInput!: ClearableLabeledInput
  removePasswordTimeout: any
  direction: DirectionType = 'ltr'

  constructor(props: InputProps) {
    super(props)
    const value = typeof props.value === 'undefined' ? props.defaultValue : props.value
    this.state = {
      value,
      focused: false,
      prevValue: props.value,
    }
  }
  // 接收新的参数来更新state
  static getDerivedStateFromProps(nextProps: InputProps, { prevValue }: InputState) {
    const value = typeof nextProps.value === 'undefined' ? nextProps.defaultValue : nextProps.value
    if (value === prevValue) {
      return null
    }
    const newState: Partial<InputState> = { prevValue: value }
    if (value !== undefined || prevValue !== value) {
      newState.value = value
    }
    if (nextProps.disabled) {
      newState.focused = false
    }
    return newState
  }

  componentDidMount() {
    this.clearPasswordValueAttribute()
  }

  componentDidUpdate() {}

  componentWillUnmount() {
    if (this.removePasswordTimeout) {
      clearTimeout(this.removePasswordTimeout)
    }
  }

  getSnapshotBeforeUpdate(prevProps: InputProps) {
    if (hasPrefixSuffix(prevProps) !== hasPrefixSuffix(this.props)) {
    }
    return null
  }

  focus = (option?: InputFocusOptions) => {
    triggerFocus(this.input, option)
  }

  blur() {
    this.input.blur()
  }

  setSelectionRange(start: number, end: number, direction?: 'forward' | 'backward' | 'none') {
    this.input.setSelectionRange(start, end, direction)
  }

  select() {
    this.input.select()
  }

  saveClearableInput = (input: ClearableLabeledInput) => {
    this.clearableInput = input
  }

  saveInput = (input: HTMLInputElement) => {
    this.input = input
  }

  onFocus: React.FocusEventHandler<HTMLInputElement> = (e) => {
    const { onFocus } = this.props
    this.setState({ focused: true }, this.clearPasswordValueAttribute)
    onFocus?.(e)
  }

  onBlur: React.FocusEventHandler<HTMLInputElement> = (e) => {
    const { onBlur } = this.props
    this.setState({ focused: false }, this.clearPasswordValueAttribute)
    onBlur?.(e)
  }

  setValue(value: string, callback?: () => void) {
    if (this.props.value === undefined) {
      this.setState({ value }, callback)
    } else {
      callback?.()
    }
  }

  handleReset = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    this.setValue('', () => {
      this.focus()
    })
    resolveOnChange(this.input, e, this.props.onChange)
  }

  renderInput = (
    prefixCls: string,
    size: SizeType | undefined,
    bordered: boolean,
    input: { autoComplete: string } | undefined,
  ) => {
    const { className, addonBefore, addonAfter, size: customSize, disabled, htmlSize } = this.props

    const restProps = omit(this.props as InputProps & { inputType: any }, [
      'prefixCls',
      'onPressEnter',
      'addonBefore',
      'addonAfter',
      'prefix',
      'suffix',
      'allowClear',
      'defaultValue',
      'size',
      'inputType',
      'bordered',
      'htmlSize',
      'showCount',
    ])
    return (
      <input
        autoComplete={input?.autoComplete}
        {...restProps}
        onChange={this.handleChange}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        onKeyDown={this.handleKeyDown}
        className={classNames(
          getInputClassName(prefixCls, bordered, customSize || size, disabled, this.direction),
          {
            [className!]: className && !addonAfter && !addonBefore,
          },
        )}
        ref={this.saveInput}
        size={htmlSize}
      />
    )
  }

  clearPasswordValueAttribute = () => {
    this.removePasswordTimeout = setTimeout(() => {
      if (
        this.input &&
        this.input.getAttribute('type') === 'password' &&
        this.input.hasAttribute('value')
      ) {
        this.input.removeAttribute('value')
      }
    })
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setValue(e.target.value, this.clearPasswordValueAttribute)
    resolveOnChange(this.input, e, this.props.onChange)
  }

  handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { onPressEnter, onKeyDown } = this.props
    if (onPressEnter) {
      onPressEnter(e)
    }
    onKeyDown?.(e)
  }

  renderShowCountSuffix = (prefixCls: string) => {
    const { value } = this.state
    const { maxLength, suffix, showCount } = this.props
    // Max length value
    const hasMaxLength = Number(maxLength) > 0

    if (suffix || showCount) {
      const valueLength = [...fixControlledValue(value)].length
      let dataCount = null
      if (typeof showCount === 'object') {
        dataCount = showCount.formatter({ count: valueLength, maxLength })
      } else {
        dataCount = `${valueLength}${hasMaxLength ? ` / ${maxLength}` : ''}`
      }
      return (
        <>
          {!!showCount && (
            <span
              className={classNames(`${prefixCls}-show-count-suffix`, {
                [`${prefixCls}-show-count-has-suffix`]: !!suffix,
              })}
            >
              {dataCount}
            </span>
          )}
          {suffix}
        </>
      )
    }
    return null
  }

  renderComponent = (input?: { autoComplete: string }) => {
    const { value, focused } = this.state
    const {
      prefixCls: customizePrefixCls,
      bordered = true,
      direction,
      size = 'middle',
    } = this.props
    const prefixCls = customizePrefixCls ?? InputPrefixCls

    const showCountSuffix = this.renderShowCountSuffix(prefixCls)

    return (
      <ClearableLabeledInput
        {...this.props}
        size={size}
        prefixCls={prefixCls}
        inputType="input"
        value={fixControlledValue(value)}
        element={this.renderInput(prefixCls, size, bordered, input)}
        handleReset={this.handleReset}
        ref={this.saveClearableInput}
        direction={direction}
        focused={focused}
        triggerFocus={this.focus}
        bordered={bordered}
        suffix={showCountSuffix}
      />
    )
  }

  render() {
    return this.renderComponent()
  }
}

export default Input
