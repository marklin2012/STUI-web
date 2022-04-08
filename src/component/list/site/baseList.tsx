import React from 'react'
import { List, Avatar } from '../../..'
import '../style'
import './index.less'

const dataString = 'UI设计（或称界面设计）是指对软件的人机交互、操作逻辑、界面美观的整体设计'

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
        itemLayout="horizontal"
        dataSource={getDatas()}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
              title={item.title}
              description={dataString}
            />
          </List.Item>
        )}
      />
    </div>
  )
}
