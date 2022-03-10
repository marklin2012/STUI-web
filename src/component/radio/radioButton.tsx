import React from 'react'
import Radio from './radio'
import { RadioChangeEvent } from './interface'
import { AbstractCheckboxProps } from '../checkbox/Checkbox'
import RadioGroupContext from './context'

export type RadioButtonProps = AbstractCheckboxProps<RadioChangeEvent>

const RadioButton = (props: RadioButtonProps, ref: React.Ref<any>) => {
  const radioGroupContext = React.useContext(RadioGroupContext)

  const { prefixCls: customizePrefixCls, ...radioProps } = props
  const prefixCls = customizePrefixCls ?? 'st-radio-button'
  if (radioGroupContext) {
    radioProps.checked = props.value === radioGroupContext.value
    radioProps.disabled = props.disabled || radioGroupContext.disabled
  }
  return <Radio prefixCls={prefixCls} {...radioProps} type="radio" ref={ref} />
}

const STRadioButton = React.forwardRef(RadioButton)

export default STRadioButton
