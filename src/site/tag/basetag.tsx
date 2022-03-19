import React from 'react'
import './index.less'
import '../../component/tag/style'
import { Tag } from '../..'

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
