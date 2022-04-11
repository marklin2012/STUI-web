import React from 'react'
import { Table, Button } from '../../..'
import '../style'
import './index.less'

export const columns = [
  {
    title: '标题1',
    dataIndex: 'title1',
    key: 'title1',
    render: (text: String) => <a>{text}</a>,
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
    render: () => {
      return (
        <div>
          <Button type={'link'}>操作1</Button>
          <Button type={'link'}>操作2</Button>
          <Button type={'link'}>操作3</Button>
        </div>
      )
    },
  },
]

export const datas = () => {
  const data = []
  for (let i = 0; i < 4; i++) {
    data.push({
      key: `${i}`,
      title1: '内容',
      title2: `${i}`,
      title3: '于千万人之中遇见你所遇见的人',
    })
  }
  return data
}

export default () => {
  return (
    <div className="tableDemo">
      <Table columns={columns} dataSource={datas()} />
    </div>
  )
}
