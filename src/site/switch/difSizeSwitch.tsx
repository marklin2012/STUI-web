import React from 'react'
import { Switch } from '../../index'
import '../../component/switch/style'
import './index.less'

export default () => {
  return (
    <div className="switch">
      <div className="sub">
        <Switch />
      </div>
      <div className="sub">
        <Switch size="small" />
      </div>
    </div>
  )
}
