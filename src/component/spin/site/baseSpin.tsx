import React from 'react'
import { Spin } from '../../..'
import '../style'
import './index.less'

export default () => {
  return (
    <div className="spin-flex">
      <Spin size="small" />
      <div className="rowSpace" />
      <Spin size="small" tip="加载中..." />
    </div>
  )
}
