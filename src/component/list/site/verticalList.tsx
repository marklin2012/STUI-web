import React from 'react'
import { List, Avatar } from '../../..'
import '../style'
import './index.less'

const listData: any[] = []
for (let i = 1; i <= 30; i++) {
  listData.push({
    title: `标题文字 ${i}`,
    avatar: 'https://joeschmoe.io/api/v1/random',
    description:
      'UI设计（或称界面设计）是指对软件的人机交互、操作逻辑、界面美观的整体设计；UI设计分为实体UI和虚拟UI。',
    content:
      'UI设计（或称界面设计）是指对软件的人机交互、操作逻辑、界面美观的整体设计。 UI设计分为实体UI和虚拟UI，互联网常用的UI设计是虚拟UI，UI即User Interface(用户界面)的简称。 好的UI设计不仅是让软件变得有个性有品位。',
  })
}

export default () => {
  return (
    <div className="listDemo">
      <List
        itemLayout="vertical"
        pagination={{
          onChange: (page) => {
            console.log(page)
          },
          pageSize: 2,
        }}
        dataSource={listData}
        renderItem={(item) => (
          <List.Item
            key={item.title}
            extra={
              <img
                width={162}
                alt="logo"
                src={'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png'}
              />
            }
          >
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} />}
              title={item.title}
              description={item.description}
            />
            {item.content}
          </List.Item>
        )}
      />
    </div>
  )
}
