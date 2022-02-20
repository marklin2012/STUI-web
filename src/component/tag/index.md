# Tag 标签

进行标记和分类的小标签

## 代码演示

### 基本用法

测试

<code src='../../site/tag/index.tsx'></code>

<!-- ```jsx
import React from 'react'
import { Tag } from 'stui'
import './style'
import { BaseDemo } from '../../site/tag'

<!-- export default () => (
  // <div className="container">
  //   <Tag>Tag1</Tag>
  //   <Tag>
  //     <a href="http://localhost:8080">link</a>
  //   </Tag>
  //   <Tag closable={true}>Prevent Default</Tag>
  // </div>

  <code ><code>
)
``` -->

<!-- ### 动态编辑

```jsx
import React, { useState } from 'react'
import { Tag } from 'stui'
import './style'

export default () => {
  return (
    <div>
      <DynamicEditing />
    </div>
  )

  function DynamicEditing() {
    const [titleTags, setTitleTags] = useState(['Unremovable', 'Tag 2', 'Tag 3'])

    let children = titleTags.map((title, index) => {
      if (index == 0) {
        return (
          <Tag key={title} tagSize={'normal'}>
            {title}
          </Tag>
        )
      } else {
        return (
          <Tag key={title} closable={true} tagSize={'normal'} onClosed={() => closedAction(title)}>
            {title}
          </Tag>
        )
      }
    })

    return (
      <div className="container">
        {children}
        <Tag isAddBtn={true}>
          <button className="addTagButton" type="button" onClick={addAction}>
            {' '}
            add Tag
          </button>
        </Tag>
      </div>
    )

    function addAction() {
      let length = titleTags.length + 1
      let newTagTitle = 'Tag ' + length
      setTitleTags([...titleTags, newTagTitle])
    }

    function closedAction(tag) {
      const tags = titleTags.filter((temp) => temp != tag)
      console.log(tags)
      setTitleTags(tags)
    }
  }
}
```

### 尺寸

```jsx
import React from 'react'
import { Tag } from 'stui'
import './style'

export default () => {
  return (
    <div>
      <DifferentSizeTags />
    </div>
  )

  function DifferentSizeTags() {
    const tagSizes = ['normal', 'middle', 'max']

    let children = tagSizes.map((size, index) => {
      return (
        <div key={size} className='container' style={{
          marginBottom: index != 2 ? 52 : 0
      }}>
          <Tag tagSize={size}>Tag1</Tag>
          <Tag tagSize={size}>
            <a href="http://localhost:8080">link</a>
          </Tag>
          <Tag tagSize={size} closable={true}>
            Tag2
          </Tag>
          <Tag tagSize={size} closable={true}>
            Prevent Default
          </Tag>
        </div>
      )
    })

    return <div className="box">{children}</div>
  }
}
```

### 可选择标签

```jsx
import React, { useState } from 'react'
import { CheckableTag } from 'stui'
import './style'

export default () => {
  return (
    <div>
      <SelectedTags />
    </div>
  )

  function SelectedTags() {
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
    return (
      <div className='container'>
        {children}
      </div>
    )

    function checkedAction(index, checked) {
      let temps = checks
      temps[index] = checked
      setChecks(temps)
    }
  }
}
```

### 自定义颜色

```jsx
import React from 'react'
import { Tag } from 'stui'
import './style'

export default () => (
  <div className='container'>
    <Tag backgroundColor="red" color="white">
      Red
    </Tag>
    <Tag backgroundColor="orange" color="white">
      Orange
    </Tag>
    <Tag backgroundColor="#FFCA28" color="white">
      Yellow
    </Tag>
    <Tag backgroundColor="green" color="white">
      Green
    </Tag>
    <Tag backgroundColor="#00BCD4" color="white">
      Cyan
    </Tag>
    <Tag backgroundColor="blue" color="white">
      Blue
    </Tag>
    <Tag backgroundColor="#673AB7" color="white">
      Violet
    </Tag>
  </div>
)
```

### 预设状态

```jsx
import React from 'react'
import { Tag } from 'stui'
import './style'

export default () => (
  <div className='container'>
    <Tag backgroundColor="#49C56425" borderColor="#49C564" color="#49C564">
      成功状态
    </Tag>
    <Tag backgroundColor="#4585FF25" borderColor="#4585FF" color="#4585FF">
      处理中状态
    </Tag>
    <Tag backgroundColor="#FF414125" borderColor="#FF4141" color="#FF4141">
      错误状态
    </Tag>
    <Tag backgroundColor="#FFA92725" borderColor="#FFA927" color="#FFA927">
      警告状态
    </Tag>
    <Tag>等待状态</Tag>
  </div>
)
``` -->
