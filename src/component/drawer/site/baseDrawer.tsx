import React, { useState } from 'react'
import { Drawer, Button } from '../../..'
import '../style'
import './index.less'

function BaseDrawer() {
  const [visible, setVisible] = useState(false)

  function showDrawer() {
    if (visible !== true) {
      setVisible(true)
    }
  }

  function onClose() {
    setVisible(false)
  }

  return (
    <div className="darwer">
      <Button type="primary" onClick={showDrawer}>
        打开
      </Button>
      <Drawer title="基础抽屉" onClose={onClose} visible={visible}>
        <p>这里是内容区域</p>
      </Drawer>
    </div>
  )
}

export default () => <BaseDrawer />
