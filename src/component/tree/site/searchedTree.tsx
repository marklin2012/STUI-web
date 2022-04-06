import React, { useState } from 'react'
import { Tree, Input, TreeDataNode } from '../../..'
import '../style'
import './index.less'

const { Search } = Input

const x = 3
const y = 2
const z = 1
const gData: TreeDataNode[] = []

const generateData = (_level: number, _preKey?: React.Key, _tns?: TreeDataNode[]) => {
  const preKey = _preKey || '0'
  const tns = _tns || gData

  const children = []
  for (let i = 0; i < x; i++) {
    const key = `${preKey}-${i}`
    tns.push({ title: key, key })
    if (i < y) {
      children.push(key)
    }
  }
  if (_level < 0) {
    return tns
  }
  const level = _level - 1
  children.forEach((key, index) => {
    tns[index].children = []
    return generateData(level, key, tns[index].children)
  })
}
generateData(z)

const dataList: TreeDataNode[] = []
const generateList = (data: TreeDataNode[]) => {
  for (let i = 0; i < data.length; i++) {
    const node = data[i]
    const { key } = node
    dataList.push({ key, title: key })
    if (node.children) {
      generateList(node.children)
    }
  }
}
generateList(gData)

const getParentKey = (key: React.Key, tree: TreeDataNode[]): React.Key => {
  let parentKey
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i]
    if (node.children) {
      if (node.children.some((item) => item.key === key)) {
        parentKey = node.key
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children)
      }
    }
  }
  return parentKey ?? ''
}

function SearchTree() {
  const [searchValue, setSearchValue] = useState('')
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>(['1-1'])
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true)

  const onExpand = (expandedKeysValue: React.Key[]) => {
    console.log('onExpand', expandedKeysValue)
    setExpandedKeys(expandedKeysValue)
    setAutoExpandParent(false)
  }

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target
    const tempItems = dataList.map((item) => {
      const title = item.title as string
      if (title?.indexOf(value) > -1) {
        return getParentKey(item.key, gData)
      }
      return ''
    })
    const tempExpandedKeys = tempItems.filter((key, i, self) => key && self.indexOf(key) === i)

    setExpandedKeys(tempExpandedKeys)
    setSearchValue(value)
    setAutoExpandParent(true)
  }

  function loop(data: TreeDataNode[]): TreeDataNode[] {
    return data.map((item) => {
      const tempTitle = item.title as String
      const index = tempTitle.indexOf(searchValue)
      const beforeStr = tempTitle.substring(0, index)
      const afterStr = tempTitle.slice(index + searchValue.length)
      const title =
        index > -1 ? (
          <span>
            {beforeStr}
            <span className="site-tree-search-value">{searchValue}</span>
            {afterStr}
          </span>
        ) : (
          <span>{item.title}</span>
        )
      if (item.children) {
        return { title, key: item.key, children: loop(item.children) }
      }

      return {
        title,
        key: item.key,
      }
    })
  }

  return (
    <div className="treeDemo">
      <Search style={{ marginBottom: 10 }} placeholder="搜索" onChange={onChange} />
      <Tree
        checkable
        onExpand={onExpand}
        expandedKeys={expandedKeys}
        autoExpandParent={autoExpandParent}
        treeData={loop(gData)}
      />
    </div>
  )
}

export default () => <SearchTree />
