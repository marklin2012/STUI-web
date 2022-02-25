import { Tooltip } from '../../index'
import React from 'react'
import './index.less'
import '../../component/tooltip/style'

export default () => {
  return (
    <div className="tooltip-box">
      <div className="row1">
        <div className="data1">
          <Tooltip title="提示文字" placement="topLeft">
            <span className="span">上左</span>
          </Tooltip>
        </div>

        <div className="data1">
          <Tooltip title="提示文字" placement="top">
            <span className="span">上中</span>
          </Tooltip>
        </div>

        <div className="data1">
          <Tooltip title="提示文字" placement="topRight">
            <span className="span">上右</span>
          </Tooltip>
        </div>
      </div>

      <div className="column1">
        <div className="data1">
          <Tooltip title="左上提示文字样式" placement="leftTop">
            <span className="span">左上(鼠标移入)</span>
          </Tooltip>
        </div>

        <div className="data1">
          <Tooltip title="左中提示文字样式" placement="left">
            <span className="span">左中(鼠标移入)</span>
          </Tooltip>
        </div>

        <div className="data1">
          <Tooltip title="左下提示文字样式" placement="leftBottom">
            <span className="span">左下(鼠标移入)</span>
          </Tooltip>
        </div>
      </div>

      <div className="column2">
        <div className="data1">
          <Tooltip title="右上提示文字样式" placement="rightTop">
            <span className="span">右上(鼠标移入)</span>
          </Tooltip>
        </div>

        <div className="data1">
          <Tooltip title="右中提示文字样式" placement="right">
            <span className="span">右中(鼠标移入)</span>
          </Tooltip>
        </div>

        <div className="data1">
          <Tooltip title="右下提示文字样式" placement="rightBottom">
            <span className="span">右下(鼠标移入)</span>
          </Tooltip>
        </div>
      </div>

      <div className="row2">
        <div className="data1">
          <Tooltip title="文字样式" placement="bottomLeft">
            <span className="span">下左</span>
          </Tooltip>
        </div>

        <div className="data1">
          <Tooltip title="文字样式" placement="bottom">
            <span className="span">下中</span>
          </Tooltip>
        </div>

        <div className="data1">
          <Tooltip title="文字样式" placement="bottomRight">
            <span className="span">下右</span>
          </Tooltip>
        </div>
      </div>
    </div>
  )
}
