import { map } from 'lodash'
import React from 'react'
import { Checkbox, CheckboxChangeEvent, CheckboxValueType } from '../..'
import '../../component/checkbox/style'
import './index.less'

function BaseCheckBox() {
  const [selected, setSelected] = React.useState(['checkbox1'])

  function onChange(checkedValues: CheckboxValueType[]) {
    console.log('checked = ', checkedValues)
  }

  function checkedChange(e: CheckboxChangeEvent) {
    console.log(`${e.target.value}-checked: ${e.target.checked}`)
    let newSelected = [...selected]
    if (selected.indexOf(e.target.value) !== -1) {
      newSelected = selected.splice(selected.indexOf(e.target.value), 1)
    } else {
      newSelected.push(e.target.value)
    }
    setSelected(newSelected)
  }

  const plainOptions = ['checkbox1', 'checkbox2', 'checkbox3', 'checkbox4']

  const options = [
    { label: 'checkbox5', value: 'checkbox5' },
    { label: 'checkbox6', value: 'checkbox6', disabled: true },
    { label: 'checkbox7', value: 'checkbox7' },
    { label: 'checkbox8', value: 'checkbox8', disabled: true },
  ]

  const verOptions = [
    { label: 'checkbox1', value: 'checkbox1' },
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
          value={verOption.value}
          defaultChecked={selected.indexOf(verOption.value) !== -1}
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
      <Checkbox.Group options={plainOptions} onChange={onChange} />
      <div className="space12"></div>
      <Checkbox.Group options={options} onChange={onChange} />
      <div className="space50"></div>
      {children}
    </div>
  )
}

export default () => BaseCheckBox()
