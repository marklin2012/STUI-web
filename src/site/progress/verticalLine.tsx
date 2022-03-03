import React from 'react'
import { Progress } from '../../index'
import '../../component/progress/style'
import './index.less'

export default () => {
  return (
    <div className="progress-circle">
      <div className="row">
        <Progress percent={30} axis={'vertical'} />
      </div>

      <div className="row">
        <Progress percent={100} axis={'vertical'} />
      </div>

      <div className="row">
        <Progress percent={75} axis={'vertical'} status={'exception'} />
      </div>

      <div className="row">
        <Progress percent={75} axis={'vertical'} status={'warning'} />
      </div>

      <div className="row">
        <Progress percent={50} axis={'vertical'} showInfo={false} />
      </div>
    </div>
  )
}
