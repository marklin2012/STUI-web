import React, { useState } from 'react'
import { Modal, Button } from '../../..'
import '../style'
import './index.less'

function MoreContent() {
  const contentString =
    '这是文本信息这是文本信息这是文本信息这是文本信息这是文本信息这是文本信息这是文本信息这是文本信息这是文本信息这是文本信息这是文本信息这是文本信息这是文本信息这是文本信息这是文本信息这是文本信息这是文本信息这是文本信息这是文本信息这是文本信息这是文本信息这是文本信息这是文本信息这是文本信息这是文本信息这是文本信息这是文本信息这是文本信息这是文本信息这是文本信息这是文本信息这是文本信息这是文本信息'

  const [isModalVisible, setIsModalVisible] = useState(false)

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  return (
    <div className="modalSite">
      <Button onClick={showModal}>More content</Button>
      <Modal
        title="这是一段错误信息"
        visible={isModalVisible}
        closable
        isScrolled
        onCancel={handleCancel}
        footer={
          <Button type="primary" onClick={handleCancel}>
            知道了
          </Button>
        }
      >
        <p>{contentString}</p>
      </Modal>
    </div>
  )
}

export default () => <MoreContent />
