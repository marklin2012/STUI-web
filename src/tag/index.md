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
  <div>
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
  <div>
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
