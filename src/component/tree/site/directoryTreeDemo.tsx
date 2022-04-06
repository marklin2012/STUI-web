import React from 'react'
import { Tree } from '../../..'
import '../style'
import './index.less'

const { DirectoryTree } = Tree

const treeData = [
  {
    title: '一级文件夹1',
    key: '1',
    children: [
      { title: '二级文件夹1', key: '1-1', isLeaf: true },
      { title: '二级文件夹2', key: '1-2', isLeaf: true },
    ],
  },
  {
    title: '一级文件夹2',
    key: '2',
    children: [
      { title: '二级文件夹1', key: '2-1', isLeaf: true },
      { title: '二级文件夹2', key: '2-2', isLeaf: true },
    ],
  },
]

export default () => {
  function onSelect() {}

  function onExpand() {}

  return (
    <div className="treeDemo">
      <DirectoryTree
        multiple
        defaultExpandAll
        onSelect={onSelect}
        onExpand={onExpand}
        treeData={treeData}
      />
    </div>
  )
}
