import React from 'react'
import { Badge, Switch } from '../../index'
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
          <span className="reducebutton" onClick={reduceClick}>
            -
          </span>
          <span className="addbutton" onClick={addClick}>
            +
          </span>
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

        <Switch checked={isDot} onChange={(checkd: boolean) => changeDotClick(checkd)}></Switch>
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

  function changeDotClick(checked: boolean) {
    setIsDot(checked)
  }
}
