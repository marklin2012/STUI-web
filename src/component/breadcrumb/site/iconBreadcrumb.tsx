import React from 'react'
import { Breadcrumb, Icon } from '../../..'
import './index.less'
import '../style'
import { prefixClsIcon } from '../../_util/prefixClsIcon'

export default () => {
  const iconRender = prefixClsIcon(<Icon icon={'home'} />)

  return (
    <div className="breadcrumb">
      <Breadcrumb>
        <Breadcrumb.Item href="">
          {iconRender}
          <span>Home</span>
        </Breadcrumb.Item>
        <Breadcrumb.Item href="">
          {iconRender}
          <span>Home</span>
        </Breadcrumb.Item>
        <Breadcrumb.Item href="">
          {iconRender}
          <span>Home</span>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          {iconRender}
          <span>Home</span>
        </Breadcrumb.Item>
      </Breadcrumb>
    </div>
  )
}
