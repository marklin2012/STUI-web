import React, { useState } from 'react'
import { DatePicker, Radio, RadioChangeEvent } from '../..'
import '../../component/datePicker/style'
import { SizeType } from '../../component/_util/type'
import './index.less'

function DifSizeDatePicker() {
  const [size, setSize] = useState('middle')

  function handleSizeChange(e: RadioChangeEvent) {
    const value = e.target.value
    if (value !== undefined && value !== size) {
      setSize(value)
    }
  }

  function onChange(date: any, dateString: any) {
    console.log(date, dateString)
  }

  return (
    <div className="datePicker">
      <Radio.Group value={size} size={size as SizeType} onChange={handleSizeChange}>
        <Radio.Button value="large">Large</Radio.Button>
        <Radio.Button value="middle">Default</Radio.Button>
        <Radio.Button value="small">Small</Radio.Button>
      </Radio.Group>
      <div className="columnSpace" />
      <DatePicker onChange={onChange} size={size as SizeType} />
    </div>
  )
}

export default () => <DifSizeDatePicker />
