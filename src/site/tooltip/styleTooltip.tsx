import { Tooltip } from '../../index'
import React from 'react'
import './index.less'
import '../../component/tooltip/style'

export default () => {
  return (
    <div className="tooltip">
      <div className="sub">
        <Tooltip title="Dark 提示文字">
          <span>鼠标移至此处显示Tooltip</span>
        </Tooltip>
      </div>

      <div className="sub">
        <Tooltip title="Light 提示文字" color={'#fff'} key={'#fff'} tipTextColor="black">
          <span>鼠标移至此处显示Tooltip</span>
        </Tooltip>
      </div>

      <div className="sub">
        <Tooltip title="Presets 提示文字" color={'red'} key={'red'}>
          <span>鼠标移至此处显示Tooltip</span>
        </Tooltip>
      </div>
    </div>
  )
}
