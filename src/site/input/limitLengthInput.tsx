import React from 'react'
import { Input } from '../..'
import './index.less'

export default () => {
  return (
    <div className="input">
      <div className="row">
        <Input placeholder="请输入内容" showCount={true} maxLength={20} />
      </div>

      <div className="textarea">
        <Input.TextArea placeholder="请输入内容" showCount={true} maxLength={200} />
      </div>
    </div>
  )
}
