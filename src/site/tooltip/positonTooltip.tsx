import { Tooltip } from '../../index'
import React from 'react'
import './index.less'
import '../../component/tooltip/style'
import { TooltipPlacement } from '../../component/tooltip'

export default () => {
  function createTooltip(title: string, placement: TooltipPlacement) {
    return (
      <Tooltip title="提示文字样式" placement={placement}>
        <span className="span">{title}</span>
      </Tooltip>
    )
  }
  return (
    <div className="tooltip-box">
      <div className="row1">
        <div className="content">
          <div className="data1">{createTooltip('上左', 'topLeft')}</div>

          <div className="data1">{createTooltip('上中', 'top')}</div>

          <div className="data1">{createTooltip('上右', 'topRight')}</div>
        </div>
      </div>

      <div className="column1">
        <div className="data1">{createTooltip('左上(鼠标移入)', 'leftTop')}</div>

        <div className="data1">{createTooltip('左中(鼠标移入)', 'left')}</div>

        <div className="data1">{createTooltip('左下(鼠标移入)', 'leftBottom')}</div>
      </div>

      <div className="column2">
        <div className="data1">{createTooltip('右上(鼠标移入)', 'rightTop')}</div>

        <div className="data1">{createTooltip('右中(鼠标移入)', 'right')}</div>

        <div className="data1">{createTooltip('右下(鼠标移入)', 'rightBottom')}</div>
      </div>

      <div className="row2">
        <div className="content">
          <div className="data1">{createTooltip('下左', 'bottomLeft')}</div>

          <div className="data1">{createTooltip('下中', 'bottom')}</div>

          <div className="data1">{createTooltip('下右', 'bottomRight')}</div>
        </div>
      </div>
    </div>
  )
}
