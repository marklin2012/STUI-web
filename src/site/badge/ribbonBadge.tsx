import React from 'react'
import { Badge } from '../../index'
import '../../component/badge/style'
import './index.less'

export default () => {
  return (
    <div className="box">
      <Badge.Ribbon text="缎带微标的样式" color={'pink'}>
        <div className="ribbon-box">这里是内容的文字；</div>
      </Badge.Ribbon>
    </div>
  )
}
