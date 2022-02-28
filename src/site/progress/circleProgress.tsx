import React from 'react'
import { Progress } from '../../index'
import '../../component/progress/style'
import './index.less'

export default () => {
  return (
    <div className="progress-circle">
      <div className="row">
        <Progress percent={75} type={'circle'} />
      </div>
      <div className="row">
        <Progress percent={70} status={'exception'} type={'circle'} />
      </div>
      <div className="row">
        <Progress percent={100} type={'circle'} />
      </div>
      <div className="row">
        <Progress
          percent={50}
          type={'circle'}
          showInfo={false}
          trailColor={'#1070FF'}
          strokeColor={'#EFF3F9'}
        />
      </div>
    </div>
  )
}
