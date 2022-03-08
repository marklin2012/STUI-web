import React from 'react'
import { Icon, Input } from '../..'
import './index.less'

export default () => {
  return (
    <div className="input">
      <div className="row">
        <p className="head">日期:</p>
        <Input placeholder="请选择日期" suffix={<Icon icon={'calendar-days'} />} />
      </div>

      <div className="row">
        <p className="head">邮箱地址:</p>
        <Input
          value={'123456@outlook.com'}
          suffix={<Icon icon={'check-circle'} color={'#49C564'} />}
        />
      </div>

      <div className="row">
        <p className="head">居住地址:</p>
        <Input placeholder="请选择地址" suffix={<Icon icon={'angle-down'} color={'#C4C5C7'} />} />
      </div>

      <div className="row">
        <Input placeholder="搜索" prefix={<Icon icon={'magnifying-glass'} color={'#C4C5C7'} />} />
      </div>

      <div className="row">
        <Input placeholder="输入内容" prefix={<Icon icon={'face-smile'} color={'#C4C5C7'} />} />
      </div>

      <div className="row">
        <Input placeholder="用户名" prefix={<Icon icon={'user'} color={'#C4C5C7'} />} />
      </div>
    </div>
  )
}
