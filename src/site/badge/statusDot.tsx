import React from 'react'
import { Badge } from '../../index'
import '../../component/badge/style'
import './index.less'

export default () => {
  return (
    <div>
      <div className="box">
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
      <div className="lineRow">
        <Badge status="error" text="错误" />
      </div>
      <div className="lineRow">
        <Badge status="default" text="默认" />
      </div>
      <div className="lineRow">
        <Badge status="success" text="成功" />
      </div>
      <div className="lineRow">
        <Badge status="warning" text="警告" />
      </div>
      <div className="lineRow">
        <Badge status="processing" text="处理中" />
      </div>
    </div>
  )
}
