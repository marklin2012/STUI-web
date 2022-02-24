import React from 'react'
import { Badge } from '../../index'
import '../../component/badge/style'
import './index.less'

export default () => {
  return (
    <div>
      <div className="badge">
        <div className="sub">
          <Badge status="success" />
        </div>
        <div className="sub">
          <Badge status="error" />
        </div>
        <div className="sub">
          <Badge status="default" />
        </div>
        <div className="sub">
          <Badge status="processing" />
        </div>
        <div className="sub">
          <Badge status="warning" />
        </div>
      </div>
      <br />
      <div className="badgeLineRow">
        <Badge status="error" text="错误" />
      </div>
      <div className="badgeLineRow">
        <Badge status="default" text="默认" />
      </div>
      <div className="badgeLineRow">
        <Badge status="success" text="成功" />
      </div>
      <div className="badgeLineRow">
        <Badge status="warning" text="警告" />
      </div>
      <div className="badgeLineRow">
        <Badge status="processing" text="处理中" />
      </div>
    </div>
  )
}
