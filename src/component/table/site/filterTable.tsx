import React from 'react'
import { Table } from '../../..'
import '../style'
import './index.less'

const columns: any[] = [
  {
    title: '标题1',
    dataIndex: 'title1',
    key: 'title1',
    filters: [
      {
        text: 'Joe',
        value: 'Joe',
      },
      {
        text: 'Jim',
        value: 'Jim',
      },
      {
        text: 'Submenu',
        value: 'Submenu',
        children: [
          {
            text: 'Green',
            value: 'Green',
          },
          {
            text: 'Black',
            value: 'Black',
          },
        ],
      },
    ],
    onFilter: (value: String, record: any) => record.title1.indexOf(value) === 0,
  },
  {
    title: '标题2',
    dataIndex: 'title2',
    key: 'title2',
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
    filters: [
      {
        text: 'London',
        value: 'London',
      },
      {
        text: 'New York',
        value: 'New York',
      },
    ],
    onFilter: (value: String, record: any) => record.title4.indexOf(value) === 0,
  },
]

const data = [
  {
    key: '1',
    title1: 'John Brown',
    title2: 923,
    title3: '于千万人之中遇见你所遇见的人',
    title4: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    title1: 'Jim Green',
    title2: 924,
    title3: '于千万人之中遇见你所遇见的人',
    title4: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    title1: 'Joe Black',
    title2: 925,
    title3: '于千万人之中遇见你所遇见的人',
    title4: 'Sidney No. 1 Lake Park',
  },
  {
    key: '4',
    title1: 'Jim Red',
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
