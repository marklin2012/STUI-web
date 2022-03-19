import React from 'react'
import { Card } from '../..'
import { defaultCardContent } from './defaultContent'
import './index.less'

export default () => {
  return (
    <div className="card">
      <Card
        title="卡片标题"
        extra={<span style={{ color: '#095BF9' }}>更多</span>}
        style={{ width: 300 }}
        bordered={false}
      >
        <Card.Meta description={defaultCardContent()} />
      </Card>
    </div>
  )
}
