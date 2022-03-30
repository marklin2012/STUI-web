import React, { useState } from 'react'
import { Modal, Button } from '../../..'
import '../style'
import './index.less'

export default () => {
  const contentString =
    '这是文本信息这是文本信息这是文本信息这是文本信息这是文本信息这是文本信息这是文本信息这是文本信息这是文本信息这是文本信息这是文本信息这是文本信息这是文本信息这是文本信息这是文本信息'
  function info() {
    Modal.info({
      title: '这是一条通知消息',
      content: contentString,
    })
  }

  function success() {
    Modal.success({ content: contentString })
  }

  function error() {
    Modal.error({
      title: '这是一条错误消息',
      content: contentString,
    })
  }

  function warning() {
    Modal.warning({
      title: '这是一条警告消息',
      content: contentString,
    })
  }

  return (
    <div className="modalSite-flex">
      <Button onClick={info}>info</Button>
      <Button onClick={success}>success</Button>
      <Button onClick={error}>error</Button>
      <Button onClick={warning}>warning</Button>
    </div>
  )
}
