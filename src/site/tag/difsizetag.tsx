import React from 'react'
import { Tag } from '../..'
import './index.less'
import '../../component/tag/style'

export default () => <DifferentSizeTags />

const DifferentSizeTags: React.FC = () => {
  const tagSizes = ['normal', 'middle', 'max']

  let children = tagSizes.map((size, index) => {
    return (
      <div
        key={size}
        className="tag"
        style={{
          marginBottom: index != 2 ? 52 : 0,
        }}
      >
        <Tag tagSize={size}>
          <p>Tag1</p>
        </Tag>
        <Tag tagSize={size}>
          <a href="http://localhost:8080">link</a>
        </Tag>
        <Tag tagSize={size} closable={true}>
          <p>Tag2</p>
        </Tag>
        <Tag tagSize={size} closable={true}>
          <p>Prevent Default</p>
        </Tag>
      </div>
    )
  })

  return <div>{children}</div>
}
