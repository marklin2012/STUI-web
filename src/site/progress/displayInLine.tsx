import React from 'react'
import { Progress } from '../../index'
import '../../component/progress/style'
import './index.less'

export default () => {
  return (
    <div className="progress">
      <div className="rowOne">
        <Progress percent={50} display={'in'} />
      </div>
      <div className="rowOne">
        <Progress percent={100} display={'in'} />
      </div>
      <div className="rowOne">
        <Progress percent={75} display={'in'} status={'exception'} />
      </div>
      <div className="rowOne">
        <Progress percent={50} display={'in'} status={'warning'} />
      </div>
    </div>
  )
}
