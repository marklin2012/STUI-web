import React from 'react'
import { Select } from '../..'
import './index.less'
import '../../component/select/style'

const { Option } = Select

export default () => {
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

  return (
    <div className="selectFlex">
      <Select
        mode="multiple"
        style={{ width: 320 }}
        placeholder={'请选择'}
        defaultValue={['1th']}
        onChange={handleChange}
      >
        {children}
      </Select>
    </div>
  )
}
