import React from 'react'
import { Table } from '../../..'
import '../style'
import './index.less'
import { columns, datas } from './baseTable'

export default () => {
  return (
    <div className="tableDemo">
      <Table
        columns={columns}
        dataSource={datas()}
        bordered
        title={() => '头部'}
        footer={() => '尾部'}
      />
    </div>
  )
}
