import React from 'react'
import { Progress } from '../../index'
import '../../component/progress/style'
import './index.less'

export default () => {
  return (
    <div className="progress-circle">
      <div className="row">
        <Progress percent={0} type={'dashboard'} format={(percent) => `${percent}s`} />
      </div>

      <div className="row">
        <Progress
          percent={50}
          type={'dashboard'}
          format={(percent) => (percent !== undefined && `${percent! / 5}s`) || '0s'}
        />
      </div>

      <div className="row">
        <Progress percent={100} type={'dashboard'} format={() => 'Done'} />
      </div>
    </div>
  )
}
