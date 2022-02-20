import React from 'react'
import { Tag } from '../../index'
import './index.less'
import '../../component/tag/style'

export default () => {
  return (
    <div className="container">
      <Tag>Tag1</Tag>
      <Tag>
        <a href="http://localhost:8080">link</a>
      </Tag>
      <Tag closable={true}>Prevent Default</Tag>
    </div>
  )
}
