import React from 'react'
import { Table, Button } from '../../..'
import '../style'
import './index.less'

const sharedOncell = (_: any, index: number) => {
  if (index === 4) {
    return { colSpan: 0 }
  }
}

const columns: any[] = [
  {
    title: '标题1',
    dataIndex: 'title1',
    key: 'title1',
    render: (text: String) => <a>{text}</a>,
    onCell: (_: any, index: number) => ({
      colSpan: index < 4 ? 1 : 5,
    }),
  },
  {
    title: '标题2',
    dataIndex: 'title2',
    key: 'title2',
    onCell: sharedOncell,
  },
  {
    title: '列合并',
    colSpan: 2,
    dataIndex: 'colMerge',
    key: 'colMerge',
    onCell: (_: any, index: number) => {
      if (index === 2) {
        return { rowSpan: 2 }
      }
      if (index === 3) {
        return { rowSpan: 0 }
      }
      if (index === 4) {
        return { colSpan: 0 }
      }
    },
  },
  {
    title: '被合并列',
    colSpan: 0,
    dataIndex: 'colMerged',
    key: 'colMerged',
    onCell: sharedOncell,
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
    onCell: sharedOncell,
  },
]

const datas = () => {
  const data = []
  for (let i = 0; i < 5; i++) {
    data.push({
      key: `${i}`,
      title1: '内容',
      title2: `${i}`,
      colMerge: '文字',
      colMerged: '文字',
    })
  }
  return data
}

export default () => {
  return (
    <div className="tableDemo">
      <Table columns={columns} dataSource={datas()} bordered />
    </div>
  )
}
