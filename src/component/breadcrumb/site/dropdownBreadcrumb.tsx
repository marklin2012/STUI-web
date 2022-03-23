import React from 'react'
import { Breadcrumb, Icon, Menu } from '../../..'
import './index.less'
import '../style'

export default () => {
  const aStyle: React.CSSProperties = { textDecoration: 'none' }
  const menu = (
    <Menu>
      <Menu.Item>
        <a href="" style={aStyle}>
          5th menu
        </a>
      </Menu.Item>
      <Menu.Item>
        <a href="" style={aStyle}>
          6th menu
        </a>
      </Menu.Item>
      <Menu.Item>
        <a href="" style={aStyle}>
          7th menu
        </a>
      </Menu.Item>
    </Menu>
  )

  return (
    <div className="breadcrumb">
      <Breadcrumb>
        <Breadcrumb.Item href="">Home</Breadcrumb.Item>
        <Breadcrumb.Item overlay={menu}>
          <a href="">Home</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item href="">Home</Breadcrumb.Item>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
      </Breadcrumb>
    </div>
  )
}
