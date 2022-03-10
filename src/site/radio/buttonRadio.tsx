import React from 'react'
import { Radio } from '../..'
import { RadioChangeEvent } from '../../component/radio'
import '../../component/radio/style'
import './index.less'

function ButtonRadio() {
  const [value1, setValue1] = React.useState('one')
  const [value2, setValue2] = React.useState('three')

  const options = [
    { label: 'one', value: 'one' },
    { label: 'two', value: 'two' },
    { label: 'three', value: 'three' },
    { label: 'four', value: 'four' },
    { label: 'five', value: 'five', disabled: true },
    { label: 'six', value: 'six' },
  ]

  function onChange1(e: RadioChangeEvent) {
    console.log('radio checked', e.target.value)
    setValue1(e.target.value)
  }

  function onChange2(e: RadioChangeEvent) {
    console.log('radio checked', e.target.value)
    setValue2(e.target.value)
  }

  return (
    <div className="radio">
      <Radio.Group options={options} value={value1} optionType="button" onChange={onChange1} />
      <div className="space12" />
      <Radio.Group
        options={options}
        value={value2}
        optionType="button"
        buttonStyle="solid"
        onChange={onChange2}
      />
    </div>
  )
}

export default () => <ButtonRadio />
