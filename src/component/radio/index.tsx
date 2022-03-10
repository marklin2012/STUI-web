import React from 'react'
import STGroup from './group'
import { RadioProps } from './interface'
import STRadio from './radio'
import STRadioButton from './radioButton'

export {
  RadioGroupButtonStyle,
  RadioGroupOptionType,
  RadioGroupProps,
  RadioGroupContextProps,
  RadioProps,
  RadioChangeEventTarget,
  RadioChangeEvent,
} from './interface'

interface CompoundedComponent
  extends React.ForwardRefExoticComponent<RadioProps & React.RefAttributes<HTMLElement>> {
  Group: typeof STGroup
  Button: typeof STRadioButton
}

const Radio = STRadio as CompoundedComponent
Radio.Group = STGroup
Radio.Button = STRadioButton

export { STRadioButton, STGroup }
export default Radio
