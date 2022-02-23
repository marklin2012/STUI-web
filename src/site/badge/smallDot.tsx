import React from 'react'
import { Badge } from '../../index'
import '../../component/badge/style'
import './index.less'

export default () => {
  return (
    <div className="box">
      <div className="sub">
        <Badge dot>
          <div
            style={{
              height: 40,
              width: 40,
              backgroundColor: '#DFE2E7',
              borderRadius: 4,
            }}
          ></div>
        </Badge>
      </div>

      <div className="sub">
        <Badge dot>
          <div
            style={{
              height: 32,
              width: 32,
              backgroundColor: 'blue',
              borderRadius: 16,
            }}
          ></div>
        </Badge>
      </div>

      <div className="sub">
        <Badge dot>
          <a href="http://localhost:8080">一个链接</a>
        </Badge>
      </div>
    </div>
  )
}
