import React, { useState } from 'react'
import { Modal, Button } from '../../..'
import '../style'
import './index.less'

function CustomWidth() {
  const [isModalVisible, setIsModalVisible] = useState(false)

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  return (
    <div className="modalSite">
      <Button onClick={showModal}>自定义宽度</Button>
      <Modal
        title="自定义宽度"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1000}
      >
        <p>这是文本信息</p>
      </Modal>
    </div>
  )
}

export default () => <CustomWidth />
