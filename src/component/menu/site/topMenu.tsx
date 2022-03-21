import React, { useState } from 'react'
import Menu from '..'
import './index.less'
import '../style'
import Icon from '../../icon'
import { map } from 'lodash'

const { SubMenu } = Menu

function TopMenu() {
  const [selected, setSelected] = useState('导航一')

  function handleClick(e: any) {
    console.log('click', e)
    setSelected(e.key)
  }

  const keys = ['导航一', '导航二', '导航三', '导航四', '导航五', '导航六', '导航七', '导航八']
  const children = map(keys, (key) => {
    if (key === '导航二') {
      return (
        <Menu.Item key={key} disabled icon={<Icon icon={'envelope'} />}>
          {key}
        </Menu.Item>
      )
    } else if (key === '导航五') {
      return (
        <SubMenu key={key} icon={<Icon icon={'envelope'} />} title={key}>
          <Menu.ItemGroup>
            <Menu.Item key="选项1">选项1</Menu.Item>
            <Menu.Item key="选项2">选项2</Menu.Item>
            <Menu.Item key="选项3">选项3</Menu.Item>
            <Menu.Item key="选项4">选项4</Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
      )
    } else {
      return (
        <Menu.Item key={key} icon={<Icon icon={'envelope'} />}>
          {key}
        </Menu.Item>
      )
    }
  })

  return (
    <div className="menu">
      <Menu onClick={handleClick} selectedKeys={[selected]} mode={'horizontal'}>
        {children}
      </Menu>
    </div>
  )
}

export default () => <TopMenu />
