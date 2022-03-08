import React from 'react'
import { Icon, Input } from '../..'
import './index.less'

export default () => {
  return (
    <div className="input">
      <div className="row">
        <Input
          placeholder="用户名"
          prefix={<Icon icon={'user'} color={'#C4C5C7'} />}
          size={'large'}
        />
      </div>

      <div className="row">
        <Input placeholder="用户名" prefix={<Icon icon={'user'} color={'#C4C5C7'} />} />
      </div>

      <div className="row">
        <Input
          placeholder="用户名"
          prefix={<Icon icon={'user'} color={'#C4C5C7'} />}
          size={'small'}
        />
      </div>
    </div>
  )
}
