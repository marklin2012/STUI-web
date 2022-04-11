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
        expandable={{
          expandedRowRender: () => {
            return (
              <p style={{ margin: 0 }}>
                {'这里是展开的内容文字，文字可以换行，总之就是可以很长。'}
              </p>
            )
          },
        }}
      />
    </div>
  )
}
