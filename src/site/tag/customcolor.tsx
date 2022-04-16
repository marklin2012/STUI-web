import React from 'react'
import { Tag } from '../..'
import './index.less'
import '../../component/tag/style'

const defaultStyle: React.CSSProperties = {
  color: 'white',
  borderColor: 'transparent',
}
export default () => (
  <div className="tag">
    <Tag {...defaultStyle} backgroundColor="red">
      <p>Red</p>
    </Tag>
    <Tag {...defaultStyle} backgroundColor="orange">
      <p>Orange</p>
    </Tag>
    <Tag {...defaultStyle} backgroundColor="#FFCA28">
      <p>Yellow</p>
    </Tag>
    <Tag {...defaultStyle} backgroundColor="green">
      <p>Green</p>
    </Tag>
    <Tag {...defaultStyle} backgroundColor="#00BCD4">
      <p>Cyan</p>
    </Tag>
    <Tag {...defaultStyle} backgroundColor="blue">
      <p>Blue</p>
    </Tag>
    <Tag {...defaultStyle} backgroundColor="#673AB7">
      <p>Violet</p>
    </Tag>
  </div>
)
