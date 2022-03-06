import React from 'react'
import { Card, Icon } from '../..'
import Meta from '../../component/card/meta'
import { defaultCardContent } from './defaultContent'
import './index.less'

export default () => {
  return (
    <div className="gridCard">
      <div className="card1">
        <Card
          title="卡片标题"
          extra={<span style={{ color: '#095BF9' }}>更多</span>}
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
          <Meta description={defaultCardContent()} />
        </Card>
      </div>

      <div className="card1">
        <Card
          title="卡片标题"
          extra={<span style={{ color: '#095BF9' }}>更多</span>}
          style={{ width: 300 }}
          actions={[
            <Icon key={'gear'} icon={'gear'} />,
            <Icon key={'pen'} icon={'pen'} />,
            <Icon key={'ellipsis'} icon={'ellipsis'} />,
          ]}
        >
          <Meta description={defaultCardContent()} />
        </Card>
      </div>
    </div>
  )
}