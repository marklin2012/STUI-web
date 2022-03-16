import React, { useState } from 'react'
import { Radio, Select } from '../..'
import './index.less'
import '../../component/select/style'
import { RadioChangeEvent } from '../../component/radio'
import { SizeType } from '../../component/_util/type'

const { Option } = Select

function DifSizeSelect() {
  const [size, setSize] = useState('middle')

  const children = []
  for (let i = 1; i < 20; i++) {
    children.push(
      <Option key={i.toString()} disabled={i % 4 === 0}>
        {`${i}th`}
      </Option>,
    )
  }

  function handleChange(value: any) {
    console.log(`selected ${value}`)
  }

  function handleSizeChange(e: RadioChangeEvent) {
    const value = e.target.value
    if (value !== undefined && value !== size) {
      setSize(value)
    }
  }

  return (
    <div className="selectBlock">
      <Radio.Group value={size} size={size as SizeType} onChange={handleSizeChange}>
        <Radio.Button value="large">Large</Radio.Button>
        <Radio.Button value="middle">Default</Radio.Button>
        <Radio.Button value="small">Small</Radio.Button>
      </Radio.Group>
      <div className="columnSpace" />
      <Select
        mode="multiple"
        style={{ width: 320 }}
        placeholder={'请选择'}
        defaultValue={['1th']}
        onChange={handleChange}
        size={size as SizeType}
      >
        {children}
      </Select>
    </div>
  )
}

export default () => <DifSizeSelect />
