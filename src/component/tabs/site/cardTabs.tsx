import React from 'react'
import { Tabs } from '../../..'
import './index.less'
import '../style'

const { TabPane } = Tabs

export default () => {
  let cardNumbers = []
  for (let i = 1; i < 8; i++) {
    cardNumbers.push(i)
  }

  return (
    <div className="tabs">
      <Tabs defaultActiveKey="1" type={'card'}>
        {cardNumbers.map((i) => {
          return (
            <TabPane tab={`Tab ${i}`} key={i}>
              {`这里是文字内容${i}`}
            </TabPane>
          )
        })}
      </Tabs>
    </div>
  )
}
