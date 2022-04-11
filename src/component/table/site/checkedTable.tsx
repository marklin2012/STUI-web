import React from 'react'
import { Table } from '../../..'
import '../style'
import './index.less'
import { columns, datas } from './baseTable'

interface DataType {
  key: React.Key
  title1: string
  title2: string
  title3: string
}

export default () => {
  const rowSelection = {
    onChange: (selectRowKeys: React.Key[], selectedRows: DataType[]) => {
      console.log(`selectedRowKeys: ${selectRowKeys}`, `selectedRows: ${selectedRows}`)
    },
    getCheckboxProps: (record: DataType) => ({
      name: record.title1,
    }),
  }

  return (
    <div className="tableDemo">
      <Table
        columns={columns}
        dataSource={datas()}
        rowSelection={{
          type: 'checkbox',
          ...rowSelection,
        }}
      />
    </div>
  )
}
