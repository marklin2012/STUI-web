import React from 'react'
import { Progress } from '../../index'
import '../../component/progress/style'
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
        <Progress percent={70} status={'warning'} />
      </div>

      <div className="rowOne-last">
        <Progress percent={50} showInfo={false} />
      </div>
    </div>
  )
}
