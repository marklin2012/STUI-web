import React from 'react'
import Dropdown from '..'
import './index.less'
import '../style'
import Icon from '../../icon'

export default () => {
  const menu = (
    <div className="st-dropdown-menu">
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        1st menu item
      </a>
      <br />
      <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
        2nd menu item (disabled)
      </a>
    </div>
  )
  return (
    <div className="dropdown">
      <Dropdown overlay={menu}>
        <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
          Hover me <Icon icon={'angle-down'} />
        </a>
      </Dropdown>
    </div>
  )
}
