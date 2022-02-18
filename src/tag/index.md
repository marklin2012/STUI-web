---
title: Tag 标签
nav:
  title: Tag
  order: 2
group:
  title: 数据展示
  order: 1
---

# Tag 标签

进行标记和分类的小标签

## 代码演示

### 基本用法

```jsx
import React from 'react'
import { Tag } from 'stui'
import './style'

export default () => (
  <div className="container">
    <Tag>Tag1</Tag>
    <span />
    <Tag>
      <a href="http://localhost:8080">link</a>
    </Tag>
    <span />
    <Tag tagType="closed" onClosed={onClosedAction}>
      Tag2
    </Tag>
    <span />
    <Tag tagType="closed" onClosed={onClosedAction}>
      Prevent Default
    </Tag>
  </div>
)

function onClosedAction() {
  console.log('点击了关闭')
}
```

### 动态编辑

```jsx
import React from 'react'
import { Tag } from 'stui'
import './style'

export default () => (
  <div className="container">
    <Tag>Tag1</Tag>
    <span />
    <Tag tagType="closed" onClosed={onClosedAction}>
      Tag2
    </Tag>
    <span />
    <Tag tagType="closed" onClosed={onClosedAction}>
      Tag3
    </Tag>
    <span />
    <Tag tagType="closed" onClosed={onClosedAction}>
      Tag4
    </Tag>
    <span />
    <Tag tagType="add" onAdded={onAddedAction}>
      New Tag
    </Tag>
    <span />
  </div>
)

function onClosedAction() {
  console.log('点击了关闭')
}

function onAddedAction() {
  console.log('点击了添加')
}
```

### 尺寸

```jsx
import React from 'react'
import { Tag } from 'stui'
import './style'

export default () => (
  <div className="sizeContainer">
    <div>
      <Tag>Tag1</Tag>
      <Tag>
        <a href="http://localhost:8080">link</a>
      </Tag>
      <Tag tagType="closed" onClosed={onClosedAction}>
        Tag2
      </Tag>
      <Tag tagType="closed" onClosed={onClosedAction}>
        Prevent Default
      </Tag>
    </div>

    <div>
      <Tag tagSize="middle">Tag1</Tag>
      <Tag tagSize="middle">
        <a href="http://localhost:8080">link</a>
      </Tag>
      <Tag tagSize="middle" tagType="closed" onClosed={onClosedAction}>
        Tag2
      </Tag>
      <Tag tagSize="middle" tagType="closed" onClosed={onClosedAction}>
        Prevent Default
      </Tag>
    </div>

    <div>
      <Tag tagSize="max">Tag1</Tag>
      <Tag tagSize="max">
        <a href="http://localhost:8080">link</a>
      </Tag>
      <Tag tagSize="max" tagType="closed" onClosed={onClosedAction}>
        Tag2
      </Tag>
      <Tag tagSize="max" tagType="closed" onClosed={onClosedAction}>
        Prevent Default
      </Tag>
    </div>
  </div>
)

function onClosedAction() {
  console.log('点击了关闭')
}
```

### 自定义颜色

```jsx
import React from 'react'
import { Tag } from 'stui'
import './style'

export default () => (
  <div className="sizeContainer">
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
  <div className="sizeContainer">
    <div>
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
  </div>
)
```
