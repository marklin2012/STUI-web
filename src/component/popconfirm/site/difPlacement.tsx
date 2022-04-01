import React from 'react'
import { Popconfirm, Button } from '../../..'
import { TooltipPlacement } from '../../tooltip'
import '../style'
import './index.less'

export default () => {
  function createPopconfirm(title: string, placement: TooltipPlacement) {
    return (
      <Popconfirm
        title={'这是一条确认信息'}
        onConfirm={() => {
          console.log('确认')
        }}
        onCancel={() => {
          console.log('取消')
        }}
        placement={placement}
      >
        <Button size="small">{title}</Button>
      </Popconfirm>
    )
  }

  return (
    <div className="popconfirm">
      <div className="row1">
        <div className="content">
          <div className="data1">{createPopconfirm('上左', 'topLeft')}</div>

          <div className="data1">{createPopconfirm('上边', 'top')}</div>

          <div className="data1">{createPopconfirm('上右', 'topRight')}</div>
        </div>
      </div>

      <div className="column1">
        <div className="data1">{createPopconfirm('左上', 'leftTop')}</div>

        <div className="data1">{createPopconfirm('左边', 'left')}</div>

        <div className="data1">{createPopconfirm('左下', 'leftBottom')}</div>
      </div>

      <div className="column2">
        <div className="data1">{createPopconfirm('右上', 'rightTop')}</div>

        <div className="data1">{createPopconfirm('右边', 'right')}</div>

        <div className="data1">{createPopconfirm('右下', 'rightBottom')}</div>
      </div>

      <div className="row2">
        <div className="content">
          <div className="data1">{createPopconfirm('下左', 'bottomLeft')}</div>

          <div className="data1">{createPopconfirm('下边', 'bottom')}</div>

          <div className="data1">{createPopconfirm('下右', 'bottomRight')}</div>
        </div>
      </div>
    </div>
  )
}
