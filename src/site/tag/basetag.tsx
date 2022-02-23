import React from 'react'
import { Tag } from '../../index'
import './index.less'
import '../../component/tag/style'

export default () => {
  return (
    <div className="container">
      <Tag>
        <p>Tag1</p>
      </Tag>

      <Tag>
        <a href="http://localhost:8080">link</a>
      </Tag>

      <Tag closable={true}>
        <p>Prevent Default</p>
      </Tag>
    </div>
  )
}
