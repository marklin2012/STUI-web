import React from 'react'
import { Card, Button, Icon } from '../..'
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
          actions={[
            <Icon key={'gear'} icon={'gear'} />,
            <Icon key={'pen'} icon={'pen'} />,
            <Icon key={'ellipsis'} icon={'ellipsis'} />,
          ]}
        >
          <Card.Meta description={defaultCardContent()} />
        </Card>
      </div>

      <div className="card1">
        <Card
          title="卡片标题"
          extra={<Button type="link">更多</Button>}
          style={{ width: 300 }}
          actions={[
            <Icon key={'gear'} icon={'gear'} />,
            <Icon key={'pen'} icon={'pen'} />,
            <Icon key={'ellipsis'} icon={'ellipsis'} />,
          ]}
        >
          <Card.Meta description={defaultCardContent()} />
        </Card>
      </div>
    </div>
  )
}
