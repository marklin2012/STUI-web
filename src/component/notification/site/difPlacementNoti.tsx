import React from 'react'
import { NotificationPlacement } from '..'
import { Notification, Button } from '../../..'
import '../style'
import './index.less'

export default () => {
  function openNotification(placement: string) {
    Notification.info({
      message: '通知的标题',
      description:
        '这是文本信息这是文本信息这是文本信息这是文本信息，这是文本信息这是文本信息这是文本信息这是文本信息',
      onClick: () => {},
      placement: placement as NotificationPlacement,
    })
  }

  return (
    <div className="notification-flex">
      <Button onClick={() => openNotification('topRight')}>右上角</Button>
      <Button onClick={() => openNotification('bottomRight')}>右下角</Button>
      <Button onClick={() => openNotification('bottomLeft')}>左下角</Button>
      <Button onClick={() => openNotification('topLeft')}>左上角</Button>
    </div>
  )
}
