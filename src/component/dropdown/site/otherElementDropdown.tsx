import React from 'react'
import Dropdown from '..'
import './index.less'
import '../style'
import Icon from '../../icon'
import Menu from '../../menu'
import Button from '../../button'

export default () => {
  const menu = (
    <Menu>
      <Menu.Item key={1}>1st menu item</Menu.Item>
      <Menu.Item key={2} icon={<Icon icon={'angle-down'} />} disabled>
        2st menu item
      </Menu.Item>
      <Menu.Item key={3} disabled>
        3st menu item
      </Menu.Item>
      <Menu.Item key={4} danger>
        a danger item
      </Menu.Item>
      <Menu.Item key={5}>5st menu item</Menu.Item>
      <Menu.Divider />
      <Menu.Item key={6}>6st menu item</Menu.Item>
    </Menu>
  )
  return (
    <div className="dropdown-flex">
      <Dropdown overlay={menu} trigger={['click']}>
        <span style={{ color: '#095BF9' }}>
          Click me <Icon icon={'angle-down'} />
        </span>
      </Dropdown>
      <div className="rowSpace" />
      <Dropdown overlay={menu} trigger={['click']}>
        <Button size="small">
          Click me <Icon icon={'angle-down'} style={{ paddingLeft: 8 }} />
        </Button>
      </Dropdown>
      <div className="rowSpace" />
      <Dropdown overlay={menu} trigger={['click']}>
        <Button size="small" type="primary">
          Click me <Icon icon={'angle-down'} style={{ paddingLeft: 8 }} />
        </Button>
      </Dropdown>
    </div>
  )
}
