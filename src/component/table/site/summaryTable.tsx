import React from 'react'
import { Table } from '../../..'
import '../style'
import './index.less'

const columns = [
  {
    title: '标题1',
    dataIndex: 'title1',
    key: 'title1',
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
  },
]

const datas = () => {
  const data = []
  for (let i = 0; i < 4; i++) {
    data.push({
      key: `${i}`,
      title1: '内容',
      title2: '内容',
      title3: i,
      title4: 1282174,
    })
  }
  return data
}

export default () => {
  return (
    <div className="tableDemo">
      <Table
        columns={columns}
        dataSource={datas()}
        bordered
        summary={(pageData) => {
          let totalTitle3 = 0
          let totalTitle4 = 0

          pageData.forEach(({ title3, title4 }) => {
            totalTitle3 += title3
            totalTitle4 += title4
          })

          return (
            <>
              <Table.Summary.Row>
                <Table.Summary.Cell index={0}>合计</Table.Summary.Cell>
                <Table.Summary.Cell index={1} />
                <Table.Summary.Cell index={2}>
                  <span style={{ color: 'red' }}>{totalTitle3}</span>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={3}>
                  <span style={{ color: 'red' }}>{totalTitle4}</span>
                </Table.Summary.Cell>
              </Table.Summary.Row>
            </>
          )
        }}
      />
    </div>
  )
}
