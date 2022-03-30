import React, { useState } from 'react'
import { placementType } from '..'
import { Drawer, Button, Radio, RadioChangeEvent } from '../../..'
import '../style'
import './index.less'

function DifPlacement() {
  const [visible, setVisible] = useState(false)
  const [placement, setPlacement] = useState('right')

  function showDrawer() {
    if (visible !== true) {
      setVisible(true)
    }
  }

  function onClose() {
    setVisible(false)
  }

  function onChange(e: RadioChangeEvent) {
    const temp = e.target.value
    setPlacement(temp)
  }

  return (
    <div className="darwer-flex">
      <Radio.Group value={placement} onChange={onChange}>
        <Radio value="top">top</Radio>
        <Radio value="right">right</Radio>
        <Radio value="bottom">bottom</Radio>
        <Radio value="left">left</Radio>
      </Radio.Group>
      <Button type="primary" onClick={showDrawer}>
        打开
      </Button>
      <Drawer
        title="基础抽屉"
        onClose={onClose}
        visible={visible}
        placement={placement as placementType}
      >
        <p>这里是内容区域</p>
      </Drawer>
    </div>
  )
}

export default () => <DifPlacement />
