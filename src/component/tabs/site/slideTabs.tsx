import React, { useState } from 'react'
import { Tabs } from '../../..'
import './index.less'
import '../style'

const { TabPane } = Tabs

function SlideTabs() {
  const [selected, SetSelected] = useState('1')

  function callback(key: string) {
    console.log('selectKey:', key)
    if (key !== selected) {
      SetSelected(key)
    }
  }

  let numbers = []
  for (let i = 1; i < 30; i++) {
    numbers.push(i)
  }

  return (
    <div className="tabs">
      <Tabs defaultActiveKey={selected} onChange={callback}>
        {numbers.map((i) => (
          <TabPane tab={`Tab ${i}`} key={i.toString()} disabled={i === 2}>
            这里是文字内容 {i}
          </TabPane>
        ))}
      </Tabs>
    </div>
  )
}

export default () => <SlideTabs />
