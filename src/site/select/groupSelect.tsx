import React from 'react'
import { Select } from '../..'
import './index.less'
import '../../component/select/style'

const { Option, OptGroup } = Select

export default () => {
  function handleChange(value: any) {
    console.log(`selected ${value}`)
  }

  return (
    <div className="selectFlex">
      <Select style={{ width: 168 }} placeholder={'请选择'} onChange={handleChange}>
        <OptGroup label={'phase one'}>
          <Option value={'1st'}>1st menu item</Option>
          <Option value={'2th'}>2th menu item</Option>
          <Option value={'3th'}>3th menu item</Option>
        </OptGroup>

        <OptGroup label={'phase two'}>
          <Option value={'4th'}>4th menu item</Option>
          <Option value={'5th'}>5th menu item</Option>
          <Option value={'6th'}>6th menu item</Option>
          <Option value={'7th'} disabled={true}>
            7th menu item
          </Option>
          <Option value={'8th'}>8th menu item</Option>
        </OptGroup>
      </Select>
    </div>
  )
}
