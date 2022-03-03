import React from 'react'
import { Progress } from '../../index'
import '../../component/progress/style'
import './index.less'

export default () => {
  return (
    <div className="progress">
      <div className="rowOne">
        <Progress percent={50} steps={20} isDot={true} />
      </div>

      <div className="rowOne">
        <Progress percent={75} steps={20} />
      </div>

      <div className="rowOne">
        <Progress percent={100} steps={40} size={'small'} strokeColor={'#49C564'} />
      </div>
    </div>
  )
}
