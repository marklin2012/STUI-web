import React from 'react'
import { Avatar, Icon, Tooltip } from '../../index'
import './index.less'
import '../../component/avatar/style'

export default () => {
  return (
    <div className="avatar">
      <div className="group">
        <Avatar.Group>
          <Tooltip>
            <Avatar style={{ color: 'white', backgroundColor: '#095BF9' }}>我</Avatar>
          </Tooltip>
          <Avatar
            style={{ backgroundColor: '#FF4141' }}
            icon={<Icon icon={'user'} color={'white'} />}
          />
          <Avatar
            style={{ backgroundColor: '#49C564' }}
            icon={<Icon icon={'user'} color={'white'} />}
          />
          <Avatar
            style={{ backgroundColor: '#4585FF' }}
            icon={<Icon icon={'user'} color={'white'} />}
          />
        </Avatar.Group>
      </div>

      <div className="group">
        <Avatar.Group
          maxCount={3}
          maxStyle={{ color: 'white', backgroundColor: '#FFA927' }}
          size={'small'}
        >
          <Avatar style={{ color: 'white', backgroundColor: '#095BF9' }}>我</Avatar>
          <Avatar
            style={{ backgroundColor: '#FF4141' }}
            icon={<Icon icon={'user'} color={'white'} />}
          />
          <Avatar
            style={{ backgroundColor: '#49C564' }}
            icon={<Icon icon={'user'} color={'white'} />}
          />
          <Avatar
            style={{ backgroundColor: '#4585FF' }}
            icon={<Icon icon={'user'} color={'white'} />}
          />
          <Avatar style={{ color: 'white', backgroundColor: '#FFA927' }}>我</Avatar>
        </Avatar.Group>
      </div>

      <div className="group">
        <Avatar.Group
          maxCount={3}
          maxStyle={{ color: 'white', backgroundColor: '#FFA927' }}
          size={'large'}
        >
          <Avatar style={{ color: 'white', backgroundColor: '#095BF9' }}>我</Avatar>
          <Avatar
            style={{ backgroundColor: '#FF4141' }}
            icon={<Icon icon={'user'} color={'white'} />}
          />
          <Avatar
            style={{ backgroundColor: '#49C564' }}
            icon={<Icon icon={'user'} color={'white'} />}
          />
          <Avatar
            style={{ backgroundColor: '#4585FF' }}
            icon={<Icon icon={'user'} color={'white'} />}
          />
          <Avatar style={{ color: 'white', backgroundColor: '#4585FF' }}>我</Avatar>
        </Avatar.Group>
      </div>
    </div>
  )
}
