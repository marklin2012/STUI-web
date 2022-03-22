import React from 'react'
import { Menu, Dropdown, Button, Icon, Tooltip } from '../../../index'
import './index.less'
import '../style'

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
      <Menu.Item key={6}>6st menu item</Menu.Item>
    </Menu>
  )

  function handleButtonClick(e: any) {
    console.log('click left button', e)
  }

  function handleMenuClick(e: any) {
    console.log('click on menu item', e)
  }

  return (
    <>
      <div className="dropdown-flex">
        <Dropdown overlay={menu}>
          <Button>
            下拉菜单按钮 <Icon icon={'angle-down'} style={{ paddingLeft: 8 }} />
          </Button>
        </Dropdown>
        <div className="rowSpace" />
        <Dropdown.Button onClick={handleButtonClick} overlay={menu} icon={<Icon icon={'user'} />}>
          下拉菜单按钮
        </Dropdown.Button>
        <div className="rowSpace" />
        <Dropdown.Button
          onClick={handleButtonClick}
          overlay={menu}
          icon={<Icon icon={'ellipsis'} />}
        >
          下拉菜单按钮
        </Dropdown.Button>
      </div>
      <br />
      <div className="dropdown-flex">
        <Dropdown overlay={menu} disabled>
          <Button>
            下拉菜单按钮 <Icon icon={'angle-down'} style={{ paddingLeft: 8 }} />
          </Button>
        </Dropdown>
        <div className="rowSpace" />
        <Dropdown.Button
          disabled
          onClick={handleButtonClick}
          overlay={menu}
          icon={<Icon icon={'user'} />}
        >
          下拉菜单按钮
        </Dropdown.Button>
        <div className="rowSpace" />
        <Dropdown.Button
          disabled
          onClick={handleButtonClick}
          overlay={menu}
          icon={<Icon icon={'ellipsis'} />}
        >
          下拉菜单按钮
        </Dropdown.Button>
      </div>
    </>
  )
}
