import React, { useState } from 'react'
import { Tree, Switch } from '../../..'
import '../style'
import './index.less'

const treeData = [
  {
    title: '一级总标题',
    key: '0',
    children: [
      {
        title: '二级1-1',
        key: '1-1',
        children: [
          {
            title: '三级1-1-1',
            key: '1-1-1',
            children: [
              {
                title: '四级1-1-1-1',
                key: '1-1-1-1',
                children: [
                  {
                    title: '展开1-1-1-1-1',
                    key: '1-1-1-1-1',
                  },
                  {
                    title: '展开1-1-1-1-2',
                    key: '1-1-1-1-2',
                  },
                ],
              },
            ],
          },
          {
            title: '三级1-1-2',
            key: '1-1-2',
            children: [
              {
                title: '四级1-1-2-1',
                key: '1-1-2-1',
                children: [
                  {
                    title: '展开1-1-2-1-1',
                    key: '1-1-2-1-1',
                  },
                  {
                    title: '展开1-1-2-1-2',
                    key: '1-1-2-1-2',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        title: '二级1-2',
        key: '1-2',
        children: [
          {
            title: '三级1-2-1',
            key: '1-2-1',
            children: [
              {
                title: '四级1-2-1-1',
                key: '1-2-1-1',
                children: [
                  {
                    title: '展开1-2-1-1-1',
                    key: '1-2-1-1-1',
                  },
                  {
                    title: '展开1-2-1-1-2',
                    key: '1-2-1-1-2',
                  },
                ],
              },
            ],
          },
          {
            title: '三级1-2-2',
            key: '1-2-2',
            children: [
              {
                title: '四级1-2-2-1',
                key: '1-2-2-1',
                children: [
                  {
                    title: '展开1-2-2-1-1',
                    key: '1-2-2-1-1',
                  },
                  {
                    title: '展开1-2-2-1-2',
                    key: '1-2-2-1-2',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        title: '二级1-3',
        key: '1-3',
      },
      {
        title: '二级1-4',
        key: '1-4',
      },
    ],
  },
]

function LineTree() {
  const [showLine, setShowLine] = useState<boolean | { showLeafIcon: boolean }>(true)
  const [showLeafIcon, setShowLeafIcon] = useState<boolean>(true)

  function onSelect() {}

  function onSetLeafIcon(checked: boolean) {
    setShowLeafIcon(checked)
    setShowLine({ showLeafIcon: checked })
  }

  function onSetShowLine(checked: boolean) {
    setShowLine(checked ? { showLeafIcon } : false)
  }

  return (
    <div className="treeDemo">
      <div className="switchs">
        <span>
          showLine: <Switch checked={!!showLine} onChange={onSetShowLine} />
        </span>
        <br />
        <span>
          showLeafIcon: <Switch checked={showLeafIcon} onChange={onSetLeafIcon} />
        </span>
      </div>
      <Tree
        showLine={showLine}
        onSelect={onSelect}
        treeData={treeData}
        defaultExpandedKeys={['1-1-1-1']}
      />
    </div>
  )
}

export default () => <LineTree />
