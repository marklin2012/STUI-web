import React from 'react'
import { Progress } from '../../index'
import '../../component/progress/style'
import './index.less'

export default () => {
  return (
    <div className="progress-circle">
      <div className="row">
        <Progress percent={75} type={'circle'} format={(percent) => `${percent} Days`} />
      </div>

      <div className="row">
        <Progress percent={100} type={'circle'} format={() => 'Done'} />
      </div>
    </div>
  )
}
