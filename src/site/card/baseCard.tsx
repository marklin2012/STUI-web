import React from 'react'
import { Card, Icon } from '../..'
import Meta from '../../component/card/meta'
import { defaultCardContent } from './defaultContent'
import './index.less'

export default () => {
  return (
    <div className="card1">
      <Card
        title="卡片标题"
        extra={<span style={{ color: '#095BF9' }}>更多</span>}
        style={{ width: 300 }}
      >
        <Meta description={defaultCardContent()} />
      </Card>
    </div>
  )
}
