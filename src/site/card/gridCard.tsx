import React from 'react'
import { Card, Icon } from '../..'
import Meta from '../../component/card/meta'
import { defaultCardContent1 } from './defaultContent'
import './index.less'

export default () => {
  return (
    <div className="gridCard">
      <div className="card1">
        <Card
          title="卡片标题"
          extra={<span style={{ color: '#095BF9' }}>更多</span>}
          style={{ width: 200 }}
        >
          {defaultCardContent1()}
        </Card>
      </div>

      <div className="card1">
        <Card
          title="卡片标题"
          extra={<span style={{ color: '#095BF9' }}>更多</span>}
          style={{ width: 200 }}
        >
          {defaultCardContent1()}
        </Card>
      </div>

      <div className="card1">
        <Card
          title="卡片标题"
          extra={<span style={{ color: '#095BF9' }}>更多</span>}
          style={{ width: 200 }}
        >
          {defaultCardContent1()}
        </Card>
      </div>

      <div className="card1">
        <Card
          title="卡片标题"
          extra={<span style={{ color: '#095BF9' }}>更多</span>}
          style={{ width: 200 }}
        >
          {defaultCardContent1()}
        </Card>
      </div>
    </div>
  )
}
