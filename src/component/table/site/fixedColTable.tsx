import React from 'react'
import { Table, Button } from '../../..'
import '../style'
import './index.less'

const columns: any[] = [
  {
    title: '标题1',
    dataIndex: 'title1',
    key: 'title1',
    width: 100,
    fixed: 'left',
  },
  { title: '标题2', dataIndex: 'title2', key: 'title2' },
  { title: '标题3', dataIndex: 'title3', key: 'title3' },
  { title: '标题4', dataIndex: 'title4', key: 'title4' },
  { title: '标题5', dataIndex: 'title5', key: 'title5' },
  { title: '标题6', dataIndex: 'title6', key: 'title6' },
  { title: '标题7', dataIndex: 'title7', key: 'title7' },
  {
    title: '标题8',
    dataIndex: 'title8',
    key: 'title8',
    render: () => {
      return (
        <div>
          <Button type={'link'}>操作1</Button>
        </div>
      )
    },
    width: 100,
    fixed: 'right',
  },
]

const datas = () => {
  const data = []
  for (let i = 0; i < 3; i++) {
    data.push({
      key: `${i}`,
      title1: '内容',
      title2: `${i}`,
      title3: '文字内容',
      title4: '文字内容',
      title5: '文字内容',
      title6: '文字内容',
      title7: '文字内容',
    })
  }
  return data
}

export default () => {
  return (
    <div className="tableDemo">
      <Table columns={columns} dataSource={datas()} scroll={{ x: 1300 }} />
    </div>
  )
}
