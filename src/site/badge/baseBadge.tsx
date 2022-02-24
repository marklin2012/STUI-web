import React from 'react'
import { Badge } from '../../index'
import '../../component/badge/style'
import './index.less'

export default () => {
  return (
    <div className="badge">
      <div className="sub">
        <Badge count={9}>
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
        <Badge count={0} showZero>
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
    </div>
  )
}
