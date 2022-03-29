import React, { useState } from 'react'
import { Modal, Button } from '../../..'
import '../style'
import './index.less'

function BaseModal() {
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
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal title="标题文字" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>{'这是文本信息'}</p>
      </Modal>
    </div>
  )
}

export default () => <BaseModal />
