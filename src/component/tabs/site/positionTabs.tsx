import React, { useState } from 'react'
import { Tabs, Radio, RadioChangeEvent } from '../../..'
import './index.less'
import '../style'
import { TabsPosition } from '..'

const { TabPane } = Tabs

function PositionTabs() {
  const [position, setPosition] = useState('top')

  function changeTabPosition(e: RadioChangeEvent) {
    if (position !== e.target.value) {
      setPosition(e.target.value)
    }
  }

  function callback(key: string) {
    console.log('selectKey:', key)
  }

  return (
    <div className="tabs">
      <Radio.Group value={position} onChange={changeTabPosition}>
        <Radio.Button value="top">top</Radio.Button>
        <Radio.Button value="bottom">bottom</Radio.Button>
        <Radio.Button value="left">left</Radio.Button>
        <Radio.Button value="right">right</Radio.Button>
      </Radio.Group>
      <div className="columnSpace" />
      <Tabs defaultActiveKey="1" onChange={callback} tabPosition={position as TabsPosition}>
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

export default () => <PositionTabs />
