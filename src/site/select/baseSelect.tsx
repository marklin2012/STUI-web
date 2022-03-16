import React from 'react'
import { Select } from '../..'
import './index.less'
import '../../component/select/style'

const { Option } = Select

export default () => {
  function handleChange(value: any) {
    console.log(`selected ${value}`)
  }
  return (
    <div className="selectFlex">
      <Select style={{ width: 160 }} placeholder={'请选择'} onChange={handleChange}>
        <Option value={'1st'}>1st menu item</Option>
        <Option value={'2th'}>2th menu item</Option>
        <Option value={'3th'}>3th menu item</Option>
        <Option disabled={true} value={'4th'}>
          4th menu item
        </Option>
        <Option value={'5th'}>5th menu item</Option>
      </Select>
      <div className="rowSpace" />
      <Select
        style={{ width: 160 }}
        placeholder={'请选择'}
        disabled={true}
        onChange={handleChange}
      />
    </div>
  )
}
