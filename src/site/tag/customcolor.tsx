import React from 'react'
import { Tag } from '../../component/tag'
import './index.less'
import '../../component/tag/style'

export default () => (
  <div className="container">
    <Tag backgroundColor="red" color="white">
      <p>Red</p>
    </Tag>
    <Tag backgroundColor="orange" color="white">
      <p>Orange</p>
    </Tag>
    <Tag backgroundColor="#FFCA28" color="white">
      <p>Yellow</p>
    </Tag>
    <Tag backgroundColor="green" color="white">
      <p>Green</p>
    </Tag>
    <Tag backgroundColor="#00BCD4" color="white">
      <p>Cyan</p>
    </Tag>
    <Tag backgroundColor="blue" color="white">
      <p>Blue</p>
    </Tag>
    <Tag backgroundColor="#673AB7" color="white">
      <p>Violet</p>
    </Tag>
  </div>
)
