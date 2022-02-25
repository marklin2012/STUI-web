import { Tooltip } from '../../index'
import React from 'react'
import './index.less'
import '../../component/tooltip/style'

export default () => {
  return (
    <div className="tooltip">
      <div className="sub">
        <Tooltip title="提示文字" placement="topLeft">
          <span>Align edge / 边缘对齐</span>
        </Tooltip>
      </div>
      <Tooltip title="提示文字" placement="bottom">
        <span>Arrow points to center / 箭头指向中心</span>
      </Tooltip>
    </div>
  )
}
