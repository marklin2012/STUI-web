import React, { useState } from 'react'
import { Spin, Button, Modal } from '../../..'
import '../style'
import './index.less'

function ScreenSpin() {
  const [visible, setVisible] = useState(false)

  const showDialog = () => {
    setVisible(true)
  }

  const handleCancel = () => {
    setVisible(false)
  }

  return (
    <div className="spin">
      <Button onClick={showDialog}>Start</Button>
      <Modal
        width={118}
        closable={false}
        footer={null}
        centered
        visible={visible}
        onCancel={handleCancel}
        bodyStyle={{ textAlign: 'center' }}
      >
        <Spin tip={'加载中...'} />
      </Modal>
    </div>
  )
}

export default () => <ScreenSpin />
