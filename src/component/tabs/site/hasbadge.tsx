import React, { useState } from 'react'
import { Tabs, Badge } from '../../..'
import './index.less'
import '../style'

const { TabPane } = Tabs

function HasBadge() {
  const [selected, SetSelected] = useState('1')

  function callback(key: string) {
    console.log('selectKey:', key)
    if (key !== selected) {
      SetSelected(key)
    }
  }

  const badgeSelectStyle = { backgroundColor: '#095BF9' }
  const badgeDisableStyle = { backgroundColor: '#DFE2E7', color: '#C4C5C7' }
  const badgeNormalStyle = { backgroundColor: '#C4C5C7', color: '#888888' }

  function getBadgeStyle(key: string, disabled?: boolean) {
    if (disabled === true) {
      return badgeDisableStyle
    } else if (key === selected) {
      return badgeSelectStyle
    } else {
      return badgeNormalStyle
    }
  }

  return (
    <div className="tabs">
      <Tabs defaultActiveKey={selected} onChange={callback}>
        <TabPane
          tab={
            <span>
              <span className="hasBadge">Tab 1</span>
              {<Badge count={100} style={getBadgeStyle('1')} />}
            </span>
          }
          key={'1'}
        >
          这里是文字内容1
        </TabPane>
        <TabPane
          tab={
            <span>
              <span className="hasBadge">Tab 2</span>
              {<Badge count={10} style={getBadgeStyle('2', true)} />}
            </span>
          }
          key={'2'}
          disabled
        >
          这里是文字内容2
        </TabPane>
        <TabPane
          tab={
            <span>
              <span className="hasBadge">Tab 3</span>
              {<Badge count={12} style={getBadgeStyle('3')} />}
            </span>
          }
          key={'3'}
        >
          这里是文字内容3
        </TabPane>
        <TabPane
          tab={
            <span>
              <span className="hasBadge">Tab 4</span>
              {<Badge count={8} style={getBadgeStyle('4')} />}
            </span>
          }
          key={'4'}
        >
          这里是文字内容4
        </TabPane>
      </Tabs>
    </div>
  )
}

export default () => <HasBadge />
