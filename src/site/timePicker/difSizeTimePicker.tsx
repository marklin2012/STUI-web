import React, { useState } from 'react'
import { TimePicker, Radio, RadioChangeEvent } from '../..'
import '../../component/timePicker/style'
import './index.less'
import moment from 'moment'
import { SizeType } from '../../component/_util/type'

function DifSizeTimePicker() {
  const [size, setSize] = useState('middle')

  function handleSizeChange(e: RadioChangeEvent) {
    const value = e.target.value
    if (value !== undefined && value !== size) {
      setSize(value)
    }
  }

  function onChange(time: moment.Moment | null, timeString?: string) {
    console.log(time, timeString)
  }

  return (
    <div className="timePicker">
      <Radio.Group value={size} size={size as SizeType} onChange={handleSizeChange}>
        <Radio.Button value="large">Large</Radio.Button>
        <Radio.Button value="middle">Default</Radio.Button>
        <Radio.Button value="small">Small</Radio.Button>
      </Radio.Group>
      <div className="columnSpace" />
      <TimePicker onChange={onChange} size={size as SizeType} />
      <div className="columnSpace" />
      <TimePicker.RangePicker size={size as SizeType} />
    </div>
  )
}

export default () => <DifSizeTimePicker />
