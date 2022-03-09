import React from 'react'
import STCheckBox, { CheckboxProps } from './checkbox'
import Group from './group'

interface CompoundedComponent
  extends React.ForwardRefExoticComponent<CheckboxProps & React.RefAttributes<HTMLInputElement>> {
  Group: typeof Group
  __ST_CHECKBOX: boolean
}

const Checkbox = STCheckBox as CompoundedComponent

Checkbox.Group = Group
Checkbox.__ST_CHECKBOX = true

export default Checkbox
