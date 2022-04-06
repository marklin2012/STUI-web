import React from 'react'
import { Tree } from '../../..'
import '../style'
import './index.less'

export const treeData = [
  {
    title: '一级 1',
    key: '1',
    children: [
      {
        title: '二级 1-1',
        key: '1-1',
        children: [
          {
            title: '三级 1-1-1',
            key: '1-1-1',
          },
          {
            title: '三级 1-1-2',
            key: '1-1-2',
          },
          {
            title: '三级 1-1-3',
            key: '1-1-3',
          },
        ],
      },
      {
        title: '二级 1-2',
        key: '1-2',
        children: [
          {
            title: '三级 1-2-1',
            key: '1-2-1',
          },
          {
            title: '三级 1-2-2',
            key: '1-2-2',
          },
          {
            title: '三级 1-2-3',
            key: '1-2-3',
          },
        ],
      },
    ],
  },
  {
    title: '一级 2',
    key: '2',
    children: [
      {
        title: '二级 2-1',
        key: '2-1',
      },
      {
        title: '二级 2-2',
        key: '2-2',
      },
    ],
  },
  {
    title: '一级 3',
    key: '3',
  },
]

export default () => {
  return (
    <div className="treeDemo">
      <Tree treeData={treeData} />
    </div>
  )
}
