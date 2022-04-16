import React from 'react'
import { Card, Button } from '../..'
import { defaultCardContent } from './defaultContent'
import './index.less'

export default () => {
  return (
    <div className="gridCard">
      <div className="card1">
        <Card
          title="卡片标题"
          extra={<Button type="link">更多</Button>}
          style={{ width: 300 }}
          cover={
            <img
              width={300}
              height={300}
              src={'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'}
            ></img>
          }
        >
          {defaultCardContent()}
        </Card>
      </div>

      <div className="card1">
        <Card
          style={{ width: 300 }}
          cover={
            <img
              width={300}
              height={300}
              src={'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'}
            ></img>
          }
        >
          {defaultCardContent()}
        </Card>
      </div>
    </div>
  )
}
