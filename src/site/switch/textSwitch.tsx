import React from 'react'
import { Switch } from '../../index'
import '../../component/switch/style'
import './index.less'

export default () => {
  return (
    <div className="switch">
      <div className="sub">
        <Switch childrensPosition={'in'} checkedChildren={'1'} unCheckedChildren={'0'} />
      </div>
      <div className="sub">
        <Switch childrensPosition={'in'} checkedChildren={'开启'} unCheckedChildren={'关闭'} />
      </div>
      <div className="sub">
        <Switch childrensPosition={'out'} checkedChildren={'开启'} unCheckedChildren={'关闭'} />
      </div>
    </div>
  )
}
