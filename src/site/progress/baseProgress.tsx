import React from 'react'
import { Progress } from '../../index'
import './index.less'

export default () => {
  return (
    <div className="progress">
      <div className="rowOne">
        <Progress percent={30} />
      </div>

      <div className="rowOne">
        <Progress percent={100} />
      </div>

      <div className="rowOne">
        <Progress percent={70} status={'exception'} />
      </div>

      <div className="rowOne">
        <Progress percent={70} strokeColor={'yellow'} />
      </div>

      <div className="rowOne">
        <Progress percent={50} showInfo={false} />
      </div>
    </div>
  )
}
