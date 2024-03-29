import React from 'react'
import classNames from 'classnames'
import useMergedState from 'rc-util/lib/hooks/useMergedState'
import Radio from './radio'
import { RadioGroupProps, RadioChangeEvent, RadioGroupButtonStyle } from './interface'
import SizeContext from '../_util/sizeContext'
import { RadioGroupContextProvider } from './context'
import getDataOrAriaProps from '../_util/hooks/getDataOrAriaProps'

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>((props, ref) => {
  const [value, setValue] = useMergedState(props.defaultValue, {
    value: props.value,
  })
  const size = React.useContext(SizeContext)

  const onRadioChange = (ev: RadioChangeEvent) => {
    const lastValue = value
    const val = ev.target.value
    if (!('value' in props)) {
      setValue(val)
    }
    const { onChange } = props
    if (onChange && val !== lastValue) {
      onChange(ev)
    }
  }

  const renderGroup = () => {
    const {
      prefixCls: customizePrefixCls,
      className = '',
      options,
      optionType,
      buttonStyle = 'outline' as RadioGroupButtonStyle,
      disabled,
      children,
      size: customizeSize,
      style,
      id,
      onMouseEnter,
      onMouseLeave,
      direction,
    } = props
    const prefixCls = customizePrefixCls ?? 'st-radio'
    const groupPrefixCls = `${prefixCls}-group`

    let childrenToRender = children
    // 如果存在 options, 优先使用
    if (options && options.length > 0) {
      const optionsPrefixCls = optionType === 'button' ? `${prefixCls}-button` : prefixCls
      childrenToRender = options.map((option) => {
        if (typeof option === 'string' || typeof option === 'number') {
          // 此处类型自动推导为 string
          return (
            <Radio
              key={option.toString()}
              prefixCls={optionsPrefixCls}
              disabled={disabled}
              value={option}
              checked={value === option}
            >
              {option}
            </Radio>
          )
        }
        // 此处类型自动推导为 { label: string value: string }
        return (
          <Radio
            key={`radio-group-value-options-${option.value}`}
            prefixCls={optionsPrefixCls}
            disabled={option.disabled || disabled}
            value={option.value}
            checked={value === option.value}
            style={option.style}
          >
            {option.label}
          </Radio>
        )
      })
    }

    const mergedSize = customizeSize || size
    const classString = classNames(
      groupPrefixCls,
      `${groupPrefixCls}-${buttonStyle}`,
      {
        [`${groupPrefixCls}-${mergedSize}`]: mergedSize,
        [`${groupPrefixCls}-rtl`]: direction === 'rtl',
      },
      className,
    )
    return (
      <div
        {...getDataOrAriaProps(props)}
        className={classString}
        style={style}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        id={id}
        ref={ref}
      >
        {childrenToRender}
      </div>
    )
  }

  return (
    <RadioGroupContextProvider
      value={{
        onChange: onRadioChange,
        value,
        disabled: props.disabled,
        name: props.name,
      }}
    >
      {renderGroup()}
    </RadioGroupContextProvider>
  )
})

const STGroup = React.memo(RadioGroup)

export default STGroup
