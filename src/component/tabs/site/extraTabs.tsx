import React from 'react'
import { Tabs, Button } from '../../..'
import './index.less'
import '../style'
import classNames from 'classnames'

const { TabPane } = Tabs

function ExtraTabs() {
  const extraBtnPrefixCls = 'tabs-extra-btn'
  const operationsSlot = {
    left: (
      <Button className={classNames(extraBtnPrefixCls, `${extraBtnPrefixCls}-left`)}>
        左按钮内容
      </Button>
    ),
    right: <Button className={extraBtnPrefixCls}>右按钮内容</Button>,
  }

  function callback(key: string) {
    console.log('selectKey:', key)
  }

  return (
    <div className="tabs">
      <Tabs defaultActiveKey="1" onChange={callback} tabBarExtraContent={operationsSlot}>
        <TabPane tab={'Tab 1'} key={1}>
          这里是文字内容1
        </TabPane>
        <TabPane tab={'Tab 2'} key={2} disabled>
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

export default () => <ExtraTabs />
