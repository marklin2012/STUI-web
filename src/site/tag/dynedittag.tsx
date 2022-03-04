import React, { useState } from 'react'
import { Tag } from '../../index'
import './index.less'
import '../../component/tag/style'

export default () => {
  return (
    <div>
      <DynamicEditing />
    </div>
  )
}

const DynamicEditing: React.FC = () => {
  const [titleTags, setTitleTags] = useState(['Unremovable', 'Tag 2', 'Tag 3'])

  let children = titleTags.map((title, index) => {
    let sub
    if (index == 0) {
      sub = (
        <Tag key={title} tagSize={'normal'}>
          <p>{title}</p>
        </Tag>
      )
    } else {
      sub = (
        <Tag key={title} closable={true} tagSize={'normal'} onClosed={() => closedAction(title)}>
          <p>{title}</p>
        </Tag>
      )
    }
    return sub
  })

  return (
    <div className="tag">
      {children}
      <Tag isAddBtn={true}>
        <span className="addTag" onClick={addAction}>
          {' '}
          add Tag
        </span>
      </Tag>
    </div>
  )

  function addAction() {
    let length = titleTags.length + 1
    let newTagTitle = 'Tag ' + length
    setTitleTags([...titleTags, newTagTitle])
  }

  function closedAction(tag: string) {
    const tags = titleTags.filter((temp) => temp != tag)
    console.log(tags)
    setTitleTags(tags)
  }
}
