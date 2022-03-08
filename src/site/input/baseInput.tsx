import React from 'react'
import { Input } from '../..'
import './index.less'

export default () => {
  return (
    <div className="input">
      <div className="row">
        <p className="head">用户名:</p>
        <Input placeholder="请输入用户名" />
      </div>

      <div className="row">
        <p className="head">密码:</p>
        <Input.Password placeholder="请输入密码" />
      </div>

      <div className="row">
        <Input placeholder="请输入密码" prefix={<p className="prefix">用户名</p>} />
      </div>

      <div className="row">
        <Input.Password placeholder="请输入密码" prefix={<p className="prefix">密码</p>} />
      </div>
    </div>
  )
}
