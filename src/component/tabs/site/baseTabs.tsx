import React from 'react'
import { Tabs } from '../../..'
import './index.less'
import '../style'

export default () => {
  const { TabPane } = Tabs

  function callback(key: string) {
    console.log('selectKey:', key)
  }

  return (
    <div className="tabs">
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab={'Tab 1'} key={1}>
          这里是文字内容1
        </TabPane>
        <TabPane tab={'Tab 2'} key={2}>
          这里是文字内容2
        </TabPane>
        <TabPane tab={'Tab 3'} key={3}>
          这里是文字内容3
        </TabPane>
        <TabPane tab={'Tab 4'} key={4}>
          这里是文字内容4
        </TabPane>
      </Tabs>
    </div>
  )
}
