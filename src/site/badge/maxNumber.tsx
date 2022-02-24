import React from 'react'
import { Badge } from '../../index'
import '../../component/badge/style'
import './index.less'

export default () => {
  return (
    <div className="badge">
      <div className="sub">
        <Badge count={99}>
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
        <Badge count={100}>
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
        <Badge count={99} overflowCount={10}>
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
        <Badge count={1000} overflowCount={999}>
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
