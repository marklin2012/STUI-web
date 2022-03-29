import React from 'react'
import { Notification, Button } from '../../..'
import '../style'
import './index.less'

export default () => {
  function openNotification(type: string) {
    const map = {
      message: '通知的标题',
      description:
        '这是文本信息这是文本信息这是文本信息这是文本信息，这是文本信息这是文本信息这是文本信息这是文本信息',
      onClick: () => {},
    }
    switch (type) {
      case 'success':
        Notification.success(map)
        break
      case 'error':
        Notification.error(map)
        break
      case 'warning':
        Notification.warning(map)
        break
      default:
        Notification.info(map)
        break
    }
  }

  return (
    <div className="notification-flex">
      <Button onClick={() => openNotification('success')}>Success</Button>
      <Button onClick={() => openNotification('info')}>Info</Button>
      <Button onClick={() => openNotification('warning')}>Warning</Button>
      <Button onClick={() => openNotification('error')}>Error</Button>
    </div>
  )
}
