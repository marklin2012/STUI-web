import React from 'react'
import { Popconfirm, Button } from '../../..'
import '../style'
import './index.less'

export default () => {
  return (
    <div className="popconfirm">
      <Popconfirm
        title={'这是一条确认信息'}
        onConfirm={() => {
          console.log('确认')
        }}
        onCancel={() => {
          console.log('取消')
        }}
        placement={'bottom'}
      >
        <Button size="small">删除</Button>
      </Popconfirm>
    </div>
  )
}
