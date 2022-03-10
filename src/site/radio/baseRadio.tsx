import { map } from 'lodash'
import React from 'react'
import { Radio } from '../..'
import { RadioChangeEvent } from '../../component/radio'
import '../../component/radio/style'
import './index.less'

function BaseRadio() {
  const [value, setValue] = React.useState('radio1')

  function onChange(e: RadioChangeEvent) {
    console.log('radio1 checked', e.target.value)
    setValue(e.target.value)
  }

  return (
    <Radio.Group onChange={onChange} value={value}>
      <Radio value={'radio1'}>radio1</Radio>
      <Radio value={'radio2'}>radio2</Radio>
      <Radio value={'radio3'}>radio3</Radio>
      <Radio value={'radio4'}>radio4</Radio>
      <Radio value={'radio5'}>radio5</Radio>
      <Radio value={'radio6'} disabled={true}>
        radio6
      </Radio>
      <Radio value={'radio7'}>radio7</Radio>
      <Radio value={'radio8'} disabled={true}>
        radio8
      </Radio>
    </Radio.Group>
  )
}

function BaseVerRadio() {
  const [value, setValue] = React.useState('radio3')

  const options = ['radio1', 'radio2', 'radio3', 'radio4', 'radio5', 'radio6']

  function onChange(e: RadioChangeEvent) {
    console.log('radio1 checked', e.target.value)
    setValue(e.target.value)
  }

  let children = map(options, (option) => {
    return (
      <div key={option}>
        <Radio
          value={option}
          checked={value === option}
          disabled={option === 'radio5'}
          onChange={onChange}
        >
          {option}
        </Radio>
        <div className="space12" />
      </div>
    )
  })

  return <div>{children}</div>
}

export default () => {
  return (
    <div className="radio">
      <BaseRadio />
      <div className="space50" />
      <BaseVerRadio />
    </div>
  )
}
