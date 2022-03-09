import { map } from 'lodash'
import React from 'react'
import { Checkbox } from '../..'
import { CheckboxChangeEvent } from '../../component/checkbox/checkbox'
import { CheckboxValueType } from '../../component/checkbox/group'
import '../../component/checkbox/style'
import './index.less'

export default () => {
  function onChange(checkedValues: CheckboxValueType[]) {
    console.log('checked = ', checkedValues)
  }

  function checkedChange(e: CheckboxChangeEvent) {
    console.log(`${e.target.checked}`)
  }

  const plainOptions = ['checkbox1', 'checkbox2', 'checkbox3', 'checkbox4']

  const options = [
    { label: 'checkbox5', value: 'checkbox5' },
    { label: 'checkbox6', value: 'checkbox6', disabled: true },
    { label: 'checkbox7', value: 'checkbox7' },
    { label: 'checkbox8', value: 'checkbox8', disabled: true },
  ]

  const verOptions = [
    { label: 'checkbox1', value: 'checkbox1', checked: true },
    { label: 'checkbox2', value: 'checkbox2' },
    { label: 'checkbox3', value: 'checkbox3' },
    { label: 'checkbox4', value: 'checkbox4' },
    { label: 'checkbox5', value: 'checkbox5' },
    { label: 'checkbox6', value: 'checkbox6', disabled: true },
  ]

  const children = map(verOptions, (verOption) => {
    return (
      <div key={verOption.value}>
        <Checkbox
          disabled={verOption.disabled}
          checked={verOption.checked}
          onChange={checkedChange}
        >
          {verOption.label}
        </Checkbox>
        <div className="space12"></div>
      </div>
    )
  })

  return (
    <div className="checkbox">
      <Checkbox.Group options={plainOptions} defaultValue={[]} onChange={onChange} />
      <div className="space12"></div>
      <Checkbox.Group options={options} defaultValue={[]} onChange={onChange} />
      <div className="space50"></div>
      {children}
    </div>
  )
}
