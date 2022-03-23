import React from 'react'
import { Breadcrumb } from '../../..'
import './index.less'
import '../style'

export default () => {
  return (
    <div className="breadcrumb">
      <Breadcrumb>
        <Breadcrumb.Item href="">Home</Breadcrumb.Item>
        <Breadcrumb.Item href="">Home</Breadcrumb.Item>
        <Breadcrumb.Item href="">Home</Breadcrumb.Item>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
      </Breadcrumb>
    </div>
  )
}
