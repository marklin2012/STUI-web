import React, { useState } from 'react'
import { CheckableTag } from '../../component/tag'
import './index.less'
import '../../component/tag/style'

export default () => {
  return (
    <div>
      <SelectedTags />
    </div>
  )
}

const SelectedTags: React.FC = () => {
  const [checks, setChecks] = useState([false, false, false, false])

  const tagsData = ['Movies', 'Books', 'Music', 'Sports']
  let children = tagsData.map((tagData, index) => {
    const selected = checks[index]
    return (
      <CheckableTag
        key={tagData}
        checked={selected}
        onChanged={(checked) => checkedAction(index, checked)}
      >
        {tagData}
      </CheckableTag>
    )
  })
  return <div className="tag">{children}</div>

  function checkedAction(index: number, checked: boolean) {
    let temps = checks
    temps[index] = checked
    setChecks(temps)
  }
}
