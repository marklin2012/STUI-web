import React from 'react'
import Dropdown from '..'
import './index.less'
import '../style'
import Icon from '../../icon'
import Menu from '../../menu'

const { SubMenu } = Menu

export default () => {
  const menu = (
    <Menu>
      <Menu.ItemGroup key={1} title={'Item Group'}>
        <Menu.Item key={11}>选项一</Menu.Item>
        <Menu.Item key={12}>选项二</Menu.Item>
      </Menu.ItemGroup>
      <SubMenu key={2} title={'Navigation One'} icon={<Icon icon={'envelope'} />}>
        <SubMenu key={21} title={'选项一'}>
          <Menu.Item key={211}>选项一</Menu.Item>
          <Menu.Item key={212}>选项二</Menu.Item>
          <Menu.Item key={213}>选项三</Menu.Item>
          <Menu.Item key={214}>选项四</Menu.Item>
        </SubMenu>
        <Menu.Item key={22}>选项二</Menu.Item>
        <Menu.Item key={23}>选项三</Menu.Item>
        <Menu.Item key={24}>选项四</Menu.Item>
      </SubMenu>
      <SubMenu key={3} title={'Navigation Two'} icon={<Icon icon={'envelope'} />}>
        <Menu.Item key={31}>选项一</Menu.Item>
        <Menu.Item key={32}>选项二</Menu.Item>
        <Menu.Item key={33}>选项三</Menu.Item>
        <Menu.Item key={34}>选项四</Menu.Item>
      </SubMenu>
      <SubMenu key={4} title={'Navigation Three'} icon={<Icon icon={'envelope'} />}>
        <Menu.Item key={41}>选项一</Menu.Item>
        <Menu.Item key={42}>选项二</Menu.Item>
        <Menu.Item key={43}>选项三</Menu.Item>
        <Menu.Item key={44}>选项四</Menu.Item>
      </SubMenu>
    </Menu>
  )

  return (
    <Dropdown overlay={menu}>
      <span style={{ color: '#095BF9' }}>
        鼠标移入查看菜单样式 <Icon icon={'angle-down'} />
      </span>
    </Dropdown>
  )
}
