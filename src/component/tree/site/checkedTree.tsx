import React, { useState } from 'react'
import { Tree } from '../../..'
import '../style'
import { treeData } from './baseTree'
import './index.less'

function CheckedTree() {
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>(['1-1'])
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>(['1-2'])
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([])
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true)

  const onExpand = (expandedKeysValue: React.Key[]) => {
    console.log('onExpand', expandedKeysValue)
    setExpandedKeys(expandedKeysValue)
    setAutoExpandParent(false)
  }

  const onCheck = (
    checkedKeysValue:
      | {
          checked: React.Key[]
          halfChecked: React.Key[]
        }
      | React.Key[],
  ) => {
    console.log('onCheck', checkedKeysValue)
    setCheckedKeys(checkedKeysValue as React.Key[])
  }

  const onSelect = (selectedKeysValue: React.Key[], info: any) => {
    console.log('onSelect', info)
    setSelectedKeys(selectedKeysValue)
  }

  return (
    <div className="treeDemo">
      <Tree
        checkable
        onExpand={onExpand}
        expandedKeys={expandedKeys}
        autoExpandParent={autoExpandParent}
        onCheck={onCheck}
        checkedKeys={checkedKeys}
        onSelect={onSelect}
        selectedKeys={selectedKeys}
        treeData={treeData}
      />
    </div>
  )
}

export default () => <CheckedTree />
