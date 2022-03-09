import React from 'react'
import classNames from 'classnames'
import { DirectionType } from '../_util/type'
import { filter, findIndex, map } from 'lodash'
import omit from 'rc-util/lib/omit'
import Checkbox from './checkbox'
import './style'

export type CheckboxValueType = string | number | boolean

export interface CheckboxOptionType {
  label: React.ReactNode
  value: CheckboxValueType
  style?: React.CSSProperties
  disabled?: boolean
  checkedChange?: (e: boolean) => void
}

export interface AbstractCheckboxGroupProps {
  prefixCls?: string
  className?: string
  options?: Array<CheckboxOptionType | string | number>
  disabled?: boolean
  style?: React.CSSProperties
  direction?: DirectionType
}

export interface CheckboxGroupProps extends AbstractCheckboxGroupProps {
  name?: string
  defaultValue?: Array<CheckboxValueType>
  value?: Array<CheckboxValueType>
  onChange?: (checkedValue: Array<CheckboxValueType>) => void
}

export interface CheckboxGroupContext {
  name?: string
  toggleOption?: (option: CheckboxOptionType) => void
  value?: any
  disabled?: boolean
  registerValue: (val: string) => void
  cancelValue: (val: string) => void
}

export const GroupContext = React.createContext<CheckboxGroupContext | null>(null)

const InternalCheckboxGroup: React.ForwardRefRenderFunction<HTMLDivElement, CheckboxGroupProps> = (
  {
    defaultValue,
    children,
    options = [],
    prefixCls: customPrefixCls,
    className,
    style,
    onChange,
    ...restProps
  },
  ref,
) => {
  const [value, setValue] = React.useState<CheckboxValueType[]>(
    restProps.value || defaultValue || [],
  )
  const [registeredValues, setRegisteredValues] = React.useState<CheckboxValueType[]>([])

  React.useEffect(() => {
    if ('value' in restProps) {
      setValue(restProps.value || [])
    }
  }, [restProps.value])

  const getOptions = () => {
    return map(options, (option) => {
      if (typeof option === 'string' || typeof option === 'number') {
        return { label: option, value: option }
      }
      return option
    })
  }

  const cancelValue = (val: string) => {
    setRegisteredValues((prevValues) => filter(prevValues, (v) => v !== val))
  }

  const registerValue = (val: string) => {
    setRegisteredValues((prevValues) => [...prevValues, val])
  }

  const toggleOption = (option: CheckboxOptionType) => {
    const optionIndex = value.indexOf(option.value)
    const newValue = [...value]
    if (optionIndex === -1) {
      newValue.push(option.value)
    } else {
      newValue.splice(optionIndex, 1)
    }
    if (!('value' in restProps)) {
      setValue(newValue)
    }
    const opts = getOptions()
    onChange?.(
      newValue
        .filter((val) => registeredValues.indexOf(val) !== -1)
        .sort((a, b) => {
          const indexA = findIndex(opts, (opt) => opt.value === a)
          const indexB = findIndex(opts, (opt) => opt.value === b)
          return indexA - indexB
        }),
    )
  }

  const prefixCls = customPrefixCls ?? 'st-checkbox'
  const groupPrefixCls = `${prefixCls}-group`
  const domProps = omit(restProps, ['value', 'disabled'])

  if (options && options.length > 0) {
    children = map(getOptions(), (option) => (
      <Checkbox
        prefixCls={prefixCls}
        key={option.value.toString()}
        disabled={'disabled' in option ? option.disabled : restProps.disabled}
        value={option.value}
        checked={value.indexOf(option.value) !== -1}
        checkedChange={() => checkedChangeHandle(option)}
        className={`${groupPrefixCls}-item`}
        style={option.style}
      >
        {option.label}
      </Checkbox>
    ))
  }

  const context = {
    toggleOption,
    value,
    disabled: restProps.disabled,
    name: restProps.name,
    registerValue,
    cancelValue,
  }
  const classStr = classNames(
    groupPrefixCls,
    {
      [`${groupPrefixCls}-rtl`]: restProps.direction === 'rtl',
    },
    className,
  )

  return (
    <div className={classStr} style={style} {...domProps} ref={ref}>
      <GroupContext.Provider value={context}>{children}</GroupContext.Provider>
    </div>
  )

  function checkedChangeHandle(option: CheckboxOptionType) {
    toggleOption(option)
  }
}

const CheckboxGroup = React.forwardRef<HTMLDivElement, CheckboxGroupProps>(InternalCheckboxGroup)

export default CheckboxGroup
