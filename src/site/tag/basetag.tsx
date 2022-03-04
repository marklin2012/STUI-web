import React from 'react'
import './index.less'
import '../../component/tag/style'
import { Tag } from '../../index'

export default () => {
  return (
    <div className="tag">
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
