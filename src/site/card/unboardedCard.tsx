import React from 'react'
import { Card, Button } from '../..'
import { defaultCardContent } from './defaultContent'
import './index.less'

export default () => {
  return (
    <div className="card">
      <Card
        title="卡片标题"
        extra={<Button type="link">更多</Button>}
        style={{ width: 300 }}
        bordered={false}
      >
        <Card.Meta description={defaultCardContent()} />
      </Card>
    </div>
  )
}
