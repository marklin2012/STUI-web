import React from 'react'
import { Switch } from '../../index'
import '../../component/switch/style'
import './index.less'

export default () => {
  return <DisableSwtich />
}

const DisableSwtich: React.FC = () => {
  const [disable, setDisable] = React.useState(false)

  return (
    <div className="switch">
      <div className="sub">
        <Switch disabled={disable} />
      </div>
      <div className="sub">
        <span className="toggle" onClick={toggleDisableAction}>
          toggle disabled
        </span>
      </div>
    </div>
  )

  function toggleDisableAction() {
    setDisable(!disable)
  }
}
