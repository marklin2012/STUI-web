import React from 'react'
import classNames from 'classnames'
import { DirectionType } from '../_util/type'
import { GroupContext } from './group'
import RcCheckbox from 'rc-checkbox'

export interface AbstractCheckboxProps<T> {
  prefixCls?: string
  className?: string
  defaultChecked?: boolean
  checked?: boolean
  style?: React.CSSProperties
  disabled?: boolean
  onChange?: (e: T) => void
  onClick?: React.MouseEventHandler<HTMLElement>
  onMouseEnter?: React.MouseEventHandler<HTMLElement>
  onMouseLeave?: React.MouseEventHandler<HTMLElement>
  onKeyPress?: React.KeyboardEventHandler<HTMLElement>
  onKeyDown?: React.KeyboardEventHandler<HTMLElement>
  value?: any
  tabIndex?: number
  name?: string
  children?: React.ReactNode
  id?: string
  autoFocus?: boolean
  type?: string
  skipGroup?: boolean
  direction?: DirectionType
}

export interface CheckboxChangeEventTarget extends CheckboxProps {
  checked: boolean
}

export interface CheckboxChangeEvent {
  target: CheckboxChangeEventTarget
  stopPropagation: () => void
  preventDefault: () => void
  nativeEvent: MouseEvent
}

export interface CheckboxProps extends AbstractCheckboxProps<CheckboxChangeEvent> {
  indeterminate?: boolean
}

const InternalCheckbox: React.ForwardRefRenderFunction<HTMLInputElement, CheckboxProps> = (
  {
    prefixCls: customPrefixCls,
    className,
    children,
    indeterminate = false,
    style,
    onMouseEnter,
    onMouseLeave,
    skipGroup = false,
    direction,
    ...restProps
  },
  ref,
) => {
  const checkboxGroup = React.useContext(GroupContext)
  const prevValue = React.useRef(restProps.value)

  React.useEffect(() => {
    checkboxGroup?.registerValue(restProps.value)
  }, [])

  React.useEffect(() => {
    if (skipGroup) return
    if (restProps.value !== prevValue.current) {
      checkboxGroup?.cancelValue(prevValue.current)
      checkboxGroup?.registerValue(restProps.value)
      prevValue.current = restProps.value
    }
    return () => checkboxGroup?.cancelValue(restProps.value)
  }, [restProps.value])

  const prefixCls = customPrefixCls ?? 'st-checkbox'
  const checkboxProps: CheckboxProps = { ...restProps }
  if (checkboxGroup && !skipGroup) {
    checkboxProps.onChange = (...args) => {
      if (restProps.onChange) {
        restProps.onChange(...args)
      }
      if (checkboxGroup.toggleOption) {
        checkboxGroup.toggleOption({ label: children, value: restProps.value })
      }
    }
    checkboxProps.name = checkboxGroup.name
    checkboxProps.checked = checkboxGroup.value.indexOf(restProps.value) !== -1
    checkboxProps.disabled = restProps.disabled || checkboxGroup.disabled
  }

  const classNameString = classNames(
    {
      [`${prefixCls}-wrapper`]: true,
      [`${prefixCls}-rtl`]: direction === 'rtl',
      [`${prefixCls}-wrapper-checked`]: checkboxProps.checked,
      [`${prefixCls}-wrapper-disabled`]: checkboxProps.disabled,
    },
    className,
  )

  const checkboxCls = classNames({
    [`${prefixCls}-indeterminate`]: indeterminate,
  })

  return (
    <label
      className={classNameString}
      style={style}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <RcCheckbox {...checkboxProps} prefixCls={prefixCls} className={checkboxCls} ref={ref} />
      {children !== undefined && <span>{children}</span>}
    </label>
  )
}

const STCheckBox = React.forwardRef<HTMLInputElement, CheckboxProps>(InternalCheckbox)

STCheckBox.displayName = 'Checkbox'

export default STCheckBox
