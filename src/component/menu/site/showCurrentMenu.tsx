import React, { useState } from 'react'
import Menu from '..'
import './index.less'
import '../style'
import Icon from '../../icon'

const { SubMenu } = Menu

function ShowCurrentMenu() {
  const rootSubMenuKeys = ['导航一', '导航二', '导航三']
  const [openKeys, setOpenKeys] = useState(['导航一'])

  function onOpenChange(keys: string[]) {
    const lastOpenKey = keys.find((key) => openKeys.indexOf(key) === -1)
    if (lastOpenKey === undefined) {
      setOpenKeys([])
    } else if (rootSubMenuKeys.indexOf(lastOpenKey) === -1) {
      setOpenKeys(keys)
    } else {
      setOpenKeys(lastOpenKey ? [lastOpenKey] : [])
    }
  }

  return (
    <Menu style={{ width: 256 }} openKeys={openKeys} onOpenChange={onOpenChange} mode="inline">
      <SubMenu key="导航一" icon={<Icon icon={'envelope'} />} title="导航一">
        <Menu.Item key="导航一选项一">导航一选项一</Menu.Item>
        <Menu.Item key="导航一选项二">导航一选项二</Menu.Item>
        <Menu.Item key="导航一选项三">导航一选项三</Menu.Item>
        <Menu.Item key="导航一选项四">导航一选项四</Menu.Item>
      </SubMenu>
      <SubMenu key="导航二" icon={<Icon icon={'envelope'} />} title="导航二">
        <Menu.Item key="导航二选项一">导航二选项一</Menu.Item>
        <Menu.Item key="导航二选项二">导航二选项二</Menu.Item>
        <Menu.Item key="导航二选项三">导航二选项三</Menu.Item>
        <Menu.Item key="导航二选项四">导航二选项四</Menu.Item>
      </SubMenu>
      <SubMenu key="导航三" icon={<Icon icon={'envelope'} />} title="导航三">
        <Menu.Item key="导航三选项一">导航三选项一</Menu.Item>
        <Menu.Item key="导航三选项二">导航三选项二</Menu.Item>
        <Menu.Item key="导航三选项三">导航三选项三</Menu.Item>
        <Menu.Item key="导航三选项四">导航三选项四</Menu.Item>
      </SubMenu>
    </Menu>
  )
}

export default () => <ShowCurrentMenu />
