import React from 'react'
import { Tag } from '../..'
import './index.less'
import '../../component/tag/style'

export default () => (
  <div className="tag">
    <Tag backgroundColor="#49C56425" borderColor="#49C564" color="#49C564">
      <p>成功状态</p>
    </Tag>
    <Tag backgroundColor="#4585FF25" borderColor="#4585FF" color="#4585FF">
      <p>处理中状态</p>
    </Tag>
    <Tag backgroundColor="#FF414125" borderColor="#FF4141" color="#FF4141">
      <p>错误状态</p>
    </Tag>
    <Tag backgroundColor="#FFA92725" borderColor="#FFA927" color="#FFA927">
      <p>警告状态</p>
    </Tag>
    <Tag>
      <p>等待状态</p>
    </Tag>
  </div>
)
