import React from 'react'
import { Tabs, Icon } from '../../..'
import './index.less'
import '../style'
import { prefixClsIcon } from '../../_util/prefixClsIcon'

export default () => {
  const { TabPane } = Tabs

  function callback(key: string) {
    console.log('selectKey:', key)
  }

  return (
    <div className="tabs">
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane
          tab={
            <span>
              {prefixClsIcon(<Icon icon={'heart'} />)}
              Tab 1
            </span>
          }
          key={1}
        >
          这里是文字内容1
        </TabPane>
        <TabPane
          tab={
            <span>
              {prefixClsIcon(<Icon icon={'fire'} />)}
              Tab 2
            </span>
          }
          key={2}
          disabled
        >
          这里是文字内容2
        </TabPane>
        <TabPane
          tab={
            <span>
              {prefixClsIcon(<Icon icon={'thumbs-up'} />)}
              Tab 3
            </span>
          }
          key={3}
        >
          这里是文字内容3
        </TabPane>
        <TabPane
          tab={
            <span>
              {prefixClsIcon(<Icon icon={'star'} />)}
              Tab 4
            </span>
          }
          key={4}
        >
          这里是文字内容4
        </TabPane>
      </Tabs>
    </div>
  )
}
