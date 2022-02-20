import React from 'react'
import { Tag } from '../../index'
import './index.less'

function baseDemo() {
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

export default baseDemo
