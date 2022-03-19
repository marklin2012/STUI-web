import React from 'react'
import { Radio, RadioChangeEvent } from '../..'
import '../../component/radio/style'
import './index.less'

function DifSizeButtonRadio() {
  const [value, setValue] = React.useState('three')

  const options = [
    { label: 'one', value: 'one' },
    { label: 'two', value: 'two' },
    { label: 'three', value: 'three' },
    { label: 'four', value: 'four' },
    { label: 'five', value: 'five', disabled: true },
    { label: 'six', value: 'six' },
  ]

  function onChange(e: RadioChangeEvent) {
    console.log('radio checked', e.target.value)
    setValue(e.target.value)
  }

  return (
    <div className="radio">
      <Radio.Group
        options={options}
        value={value}
        optionType="button"
        size="large"
        onChange={onChange}
      />
      <div className="space33" />
      <Radio.Group options={options} value={value} optionType="button" onChange={onChange} />
      <div className="space33" />
      <Radio.Group
        options={options}
        value={value}
        optionType="button"
        size="small"
        onChange={onChange}
      />
    </div>
  )
}

export default () => <DifSizeButtonRadio />
