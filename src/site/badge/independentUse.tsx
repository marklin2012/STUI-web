import React from 'react'
import { Badge } from '../../index'
import '../../component/badge/style'
import './index.less'

export default () => {
  return (
    <div className="box">
      <div className="sub">
        <Badge count={9}></Badge>
      </div>

      <div className="sub">
        <Badge count={100}></Badge>
      </div>

      <div className="sub">
        <Badge
          count={9}
          style={{
            backgroundColor: 'white',
            border: 1,
            borderRadius: 10,
            borderStyle: 'solid',
            borderColor: '#dfe2e7',
            boxSizing: 'border-box',
            color: '#888888',
          }}
        ></Badge>
      </div>

      <div className="sub">
        <Badge count={100} style={{ backgroundColor: '#52c41a' }}></Badge>
      </div>

      <div className="sub">
        <Badge dot></Badge>
      </div>

      <div className="sub">
        <Badge count={'Hot'}></Badge>
      </div>
    </div>
  )
}
