import { Tooltip } from '../../index'
import React from 'react'
import './index.less'
import '../../component/tooltip/style'

export default () => {
  return (
    <div className="tooltip">
      <div className="sub">
        <Tooltip title="提示文字">
          <span>鼠标点击此处显示Tooltip</span>
        </Tooltip>
      </div>
      <Tooltip title="提示文字" placement="bottom">
        <span>鼠标点击此处显示Tooltip</span>
      </Tooltip>
    </div>
  )
}
