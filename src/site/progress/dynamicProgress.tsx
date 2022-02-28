import React, { useState } from 'react'
import { Progress } from '../../index'
import '../../component/progress/style'
import './index.less'

export default () => <DynamicProgress />

const DynamicProgress: React.FC = () => {
  const stepNum: number = 10
  const [percent, setPercent] = React.useState(60)

  return (
    <div className="progress">
      <div className="buttonGroup">
        <button className="reducebutton" onClick={reduceClick}>
          -
        </button>
        <button className="addbutton" onClick={addClick}>
          +
        </button>
      </div>

      <div className="rowOne">
        <Progress percent={percent} />
      </div>

      <div className="rowOne-last">
        <Progress percent={percent} type={'circle'} />
      </div>
    </div>
  )

  function reduceClick() {
    let temp = 0
    if (percent >= stepNum) {
      temp = percent - stepNum
    }
    setPercent(temp)
  }

  function addClick() {
    let temp = 100
    if (percent <= 90) {
      temp = percent + stepNum
    }
    setPercent(temp)
  }
}
