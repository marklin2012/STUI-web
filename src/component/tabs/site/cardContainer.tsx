import React from 'react'
import { Tabs } from '../../..'
import '../style'
import './index.less'

const { TabPane } = Tabs

export default () => {
  let cardNumbers = []
  for (let i = 1; i < 5; i++) {
    cardNumbers.push(i)
  }

  return (
    <div className="tabs-card-container">
      <Tabs defaultActiveKey="1" type={'card'}>
        {cardNumbers.map((i) => {
          return (
            <TabPane tab={`Tab Title ${i}`} key={i}>
              {`卡片容器选项卡样式文本 ${i}`}
            </TabPane>
          )
        })}
      </Tabs>
    </div>
  )
}
