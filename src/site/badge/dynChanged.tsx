import React, { useState } from 'react'
import { Badge } from '../../index'
import '../../component/badge/style'
import './index.less'

export default () => {
  return (
    <div>
      <ChangeBadgeNumber />
    </div>
  )
}

const ChangeBadgeNumber: React.FC = () => {
  const [count, setCount] = React.useState(20)
  const [isDot, setIsDot] = React.useState(true)

  return (
    <div>
      <div className="badge">
        <div className="sub">
          <Badge count={count}>
            <div
              style={{
                height: 40,
                width: 40,
                backgroundColor: '#DFE2E7',
                borderRadius: 4,
              }}
            ></div>
          </Badge>
        </div>

        <div className="buttonGroup">
          <button className="reducebutton" onClick={reduceClick}>
            -
          </button>
          <button className="addbutton" onClick={addClick}>
            +
          </button>
        </div>
      </div>

      <br />

      <div className="badge">
        <div className="sub">
          <Badge dot={isDot}>
            <div
              style={{
                height: 40,
                width: 40,
                backgroundColor: '#DFE2E7',
                borderRadius: 4,
              }}
            ></div>
          </Badge>
        </div>

        <div className="changeDot" onClick={changeDotClick}>
          切换
        </div>
      </div>
    </div>
  )

  function addClick() {
    const temp = count + 1
    setCount(temp)
  }

  function reduceClick() {
    let temp = count - 1
    if (temp < 0) {
      temp = 0
    }
    setCount(temp)
  }

  function changeDotClick() {
    let temp = !isDot
    setIsDot(temp)
  }
}
