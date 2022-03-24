import React, { useState } from 'react'
import { Tabs, Radio, RadioChangeEvent } from '../../..'
import './index.less'
import '../style'
import { SizeType } from '../../_util/type'

const { TabPane } = Tabs

function DifSizeTabs() {
  const [size, setSize] = useState('middle')

  function changeTabSize(e: RadioChangeEvent) {
    if (size !== e.target.value) {
      setSize(e.target.value)
    }
  }

  function callback(key: string) {
    console.log('selectKey:', key)
  }

  let defaultNumbers = []
  for (let i = 1; i < 5; i++) {
    defaultNumbers.push(i)
  }

  let cardNumbers = []
  for (let i = 1; i < 8; i++) {
    cardNumbers.push(i)
  }

  return (
    <div className="tabs">
      <Radio.Group value={size} onChange={changeTabSize}>
        <Radio.Button value="small">小号</Radio.Button>
        <Radio.Button value="middle">中号</Radio.Button>
        <Radio.Button value="large">大号</Radio.Button>
      </Radio.Group>
      <div className="columnSpace" />
      <Tabs defaultActiveKey="1" onChange={callback} size={size as SizeType}>
        {defaultNumbers.map((i) => {
          return (
            <TabPane tab={`Tab ${i}`} key={i}>
              {`这里是文字内容${i}`}
            </TabPane>
          )
        })}
      </Tabs>
      <div className="columnSpace" />
      <Tabs defaultActiveKey="1" onChange={callback} size={size as SizeType} type={'card'}>
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

export default () => <DifSizeTabs />
