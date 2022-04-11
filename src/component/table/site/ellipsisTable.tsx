import React from 'react'
import { Table, Button } from '../../..'
import '../style'
import './index.less'

const columns = [
  {
    title: '标题1',
    dataIndex: 'title1',
    key: 'title1',
    width: 150,
    ellipsis: true,
  },
  {
    title: '标题2',
    dataIndex: 'title2',
    key: 'title2',
    width: 80,
  },
  {
    title: '标题3',
    dataIndex: 'title3',
    key: 'title3',
    ellipsis: true,
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
    width: 240,
  },
]

const datas = () => {
  const data = []
  for (let i = 0; i < 4; i++) {
    data.push({
      key: `${i}`,
      title1: '内容文字较长内容文字较长内容文字较长',
      title2: `${i}`,
      title3: '内容文字很长内容文字很长内容文字很长内容文字很长内容文字很长内容文字很长',
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
