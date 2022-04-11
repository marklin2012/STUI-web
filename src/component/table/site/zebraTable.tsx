import React from 'react'
import { Table } from '../../..'
import '../style'
import { columns, datas } from './baseTable'
import './index.less'

export default () => {
  return (
    <div className="tableDemo-zebra">
      <Table columns={columns} dataSource={datas()} />
    </div>
  )
}
