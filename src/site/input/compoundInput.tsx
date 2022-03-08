import React from 'react'
import { Icon, Input } from '../..'
import './index.less'

export default () => {
  return (
    <div className="input">
      <div className="row">
        <Input placeholder="请输入内容" addonBefore={'http://'} />
      </div>

      <div className="row">
        <Input placeholder="请输入内容" addonAfter={'.com'} />
      </div>

      <div className="row">
        <Input
          placeholder="请输入内容"
          addonBefore={
            <span className="onBefore">
              <p>请选择</p>
              <Icon icon={'angle-down'} color={'#C4C5C7'} />
            </span>
          }
        />
      </div>
    </div>
  )
}
