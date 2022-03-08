import React from 'react'
import { Input } from '../..'
import './index.less'

export default () => {
  return (
    <div className="input">
      <div className="row">
        <Input placeholder="请输入内容" />
      </div>

      <div className="textarea">
        <Input.TextArea placeholder="请输入内容" />
      </div>
    </div>
  )
}
