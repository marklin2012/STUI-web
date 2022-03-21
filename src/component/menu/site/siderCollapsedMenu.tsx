import React, { useState } from 'react'
import Menu from '..'
import './index.less'
import '../style'
import Icon from '../../icon'
import Button from '../../button'

const { SubMenu } = Menu

function SiderCollapsedMenu() {
  const [collapsed, setCollapsed] = useState(false)

  function toggleCollapsed() {
    setCollapsed(!collapsed)
  }

  function handleClick(e: any) {
    console.log('click ', e)
  }

  return (
    <div className="menu" style={{ width: 256 }}>
      <Button
        size={'small'}
        type="primary"
        onClick={toggleCollapsed}
        style={{ marginBottom: 16, paddingLeft: 8, paddingRight: 8 }}
      >
        {collapsed ? <Icon icon={'align-left'} /> : <Icon icon={'align-right'} />}
      </Button>
      <Menu
        onClick={handleClick}
        defaultSelectedKeys={['选项一']}
        defaultOpenKeys={['导航一']}
        mode="inline"
        inlineCollapsed={collapsed}
      >
        <SubMenu key="导航一" icon={<Icon icon={'envelope'} />} title="导航一">
          <SubMenu key="导航一选项一" title="导航一选项一">
            <Menu.Item key="导航一选项一一">导航一选项一一</Menu.Item>
            <Menu.Item key="导航一选项一二">导航一选项一二</Menu.Item>
            <Menu.Item key="导航一选项一三">导航一选项一三</Menu.Item>
            <Menu.Item key="导航一选项一四">导航一选项一四</Menu.Item>
          </SubMenu>
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
    </div>
  )
}

export default () => <SiderCollapsedMenu />
