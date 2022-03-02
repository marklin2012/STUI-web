import React from 'react'
import { Avatar, Icon } from '../../index'
import './index.less'
import '../../component/avatar/style'

export default () => {
  return (
    <div className="avatar">
      <div className="row">
        <div className="data">
          <Avatar size={64} icon={<Icon icon={'user'} color={'white'} />} />
        </div>

        <div className="data">
          <Avatar size={'large'} icon={<Icon icon={'user'} color={'white'} size={'xs'} />} />
        </div>

        <div className="data">
          <Avatar icon={<Icon icon={'user'} color={'white'} size={'sm'} />} />
        </div>

        <div className="data">
          <Avatar size={'small'} icon={<Icon icon={'user'} color={'white'} size={'sm'} />} />
        </div>
      </div>
      <br />
      <span className="divider" />
      <br />
      <div className="row">
        <div className="data">
          <Avatar size={64} shape={'square'} icon={<Icon icon={'user'} color={'white'} />} />
        </div>

        <div className="data">
          <Avatar
            size={'large'}
            shape={'square'}
            icon={<Icon icon={'user'} color={'white'} size={'xs'} />}
          />
        </div>

        <div className="data">
          <Avatar shape={'square'} icon={<Icon icon={'user'} color={'white'} size={'sm'} />} />
        </div>

        <div className="data">
          <Avatar
            size={'small'}
            shape={'square'}
            icon={<Icon icon={'user'} color={'white'} size={'sm'} />}
          />
        </div>
      </div>
    </div>
  )
}
