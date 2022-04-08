import React from 'react'
import { List, Card } from '../../..'
import '../style'
import './index.less'

function getDatas(): any[] {
  let datas = []
  for (let i = 1; i <= 4; i++) {
    datas.push({
      title: `标题文字 ${i}`,
    })
  }
  return datas
}

export default () => {
  return (
    <div className="listDemo">
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={getDatas()}
        renderItem={(item) => (
          <List.Item>
            <Card title={item.title}>Card Content</Card>
          </List.Item>
        )}
      />
    </div>
  )
}
