import React from 'react'
import { Notification, Button } from '../../..'
import '../style'
import './index.less'

export default () => {
  function openNotification() {
    Notification.open({
      message: '通知的标题',
      description:
        '这是文本信息这是文本信息这是文本信息这是文本信息，这是文本信息这是文本信息这是文本信息这是文本信息',
      onClick: () => {},
    })
  }

  return (
    <div className="notification">
      <Button type="primary" onClick={openNotification}>
        Open Notification
      </Button>
    </div>
  )
}
