import React from 'react'
import { Avatar, Icon, Image } from '../../index'
import './index.less'
import '../../component/avatar/style'

export default () => {
  return (
    <div className="avatarRow">
      <div className="data">
        <Avatar size={64} icon={<Icon icon={'user'} color={'white'} />} />
      </div>

      <div className="data">
        <Avatar
          size={64}
          icon={<Icon icon={'user'} color={'white'} />}
          style={{ background: '#095BF9' }}
        />
      </div>

      <div className="data">
        <Avatar size={64}>用户名</Avatar>
      </div>

      <div className="data">
        <Avatar size={64} style={{ color: 'white', background: '#095BF9' }}>
          用户名
        </Avatar>
      </div>

      <div className="data">
        <Avatar size={64} src="https://joeschmoe.io/api/v1/random" />
      </div>

      <div className="data">
        <Avatar size={64} src={<Image src="https://joeschmoe.io/api/v1/random" />} />
      </div>
    </div>
  )
}
