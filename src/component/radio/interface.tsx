import React from 'react'
import { AbstractCheckboxProps } from '../checkbox/checkbox'
import { AbstractCheckboxGroupProps } from '../checkbox/group'
import { SizeType } from '../_util/type'

export type RadioGroupButtonStyle = 'outline' | 'solid'
export type RadioGroupOptionType = 'default' | 'button'

export interface RadioGroupProps extends AbstractCheckboxGroupProps {
  defaultValue?: any
  value?: any
  onChange?: (e: RadioChangeEvent) => void
  size?: SizeType
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>
  name?: string
  children?: React.ReactNode
  id?: string
  optionType?: RadioGroupOptionType
  buttonStyle?: RadioGroupButtonStyle
}

export interface RadioGroupContextProps {
  onChange: (e: RadioChangeEvent) => void
  value: any
  disabled?: boolean
  name?: string
}

export type RadioProps = AbstractCheckboxProps<RadioChangeEvent>

export interface RadioChangeEventTarget extends RadioProps {
  checked: boolean
}

export interface RadioChangeEvent {
  target: RadioChangeEventTarget
  stopPropagation: () => void
  preventDefault: () => void
  nativeEvent: MouseEvent
}