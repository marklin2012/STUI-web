import React from 'react'
import Menu from '..'
import './index.less'
import '../style'
import Icon from '../../icon'

const { SubMenu } = Menu

function VerticalMenu() {
  function handleClick(e: any) {
    console.log('click ', e)
  }

  return (
    <Menu onClick={handleClick} style={{ width: 256 }} mode="vertical">
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
  )
}

export default () => <VerticalMenu />
