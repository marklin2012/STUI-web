import React from 'react'
import { Table } from '../../..'
import '../style'
import './index.less'

const columns: any[] = [
  {
    title: '标题1',
    dataIndex: 'title1',
    key: 'title1',
    sorter: (a: any, b: any) => a.title1.length - b.title1.length,
    defaultSortOrder: 'descend',
  },
  {
    title: '标题2',
    dataIndex: 'title2',
    key: 'title2',
    sorter: (a: any, b: any) => a.title2 > b.title2,
  },
  {
    title: '标题3',
    dataIndex: 'title3',
    key: 'title3',
  },
  {
    title: '标题4',
    dataIndex: 'title4',
    key: 'title4',
  },
]

const data = [
  {
    key: '1',
    title1: 'Abc',
    title2: 923,
    title3: '于千万人之中遇见你所遇见的人',
    title4: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    title1: 'Bd',
    title2: 924,
    title3: '于千万人之中遇见你所遇见的人',
    title4: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    title1: 'Ccccc',
    title2: 925,
    title3: '于千万人之中遇见你所遇见的人',
    title4: 'Sidney No. 1 Lake Park',
  },
  {
    key: '4',
    title1: 'D',
    title2: 926,
    title3: '于千万人之中遇见你所遇见的人',
    title4: 'London No. 2 Lake Park',
  },
]

export default () => {
  return (
    <div className="tableDemo">
      <Table columns={columns} dataSource={data} />
    </div>
  )
}
