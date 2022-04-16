import React from 'react'
import { Card, Button } from '../..'
import { defaultCardContent1 } from './defaultContent'
import './index.less'

export default () => {
  return (
    <div className="gridCard">
      <div className="card1">
        <Card title="卡片标题" extra={<Button type="link">更多</Button>} style={{ width: 200 }}>
          {defaultCardContent1()}
        </Card>
      </div>

      <div className="card1">
        <Card title="卡片标题" extra={<Button type="link">更多</Button>} style={{ width: 200 }}>
          {defaultCardContent1()}
        </Card>
      </div>

      <div className="card1">
        <Card title="卡片标题" extra={<Button type="link">更多</Button>} style={{ width: 200 }}>
          {defaultCardContent1()}
        </Card>
      </div>

      <div className="card1">
        <Card title="卡片标题" extra={<Button type="link">更多</Button>} style={{ width: 200 }}>
          {defaultCardContent1()}
        </Card>
      </div>
    </div>
  )
}
