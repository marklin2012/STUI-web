import { DataNode, Key } from 'rc-tree/lib/interface'

enum Record {
  None,
  Start,
  End,
}

function traverseNodeKey(
  treeData: DataNode[],
  callback: (key: Key | number, node: DataNode) => boolean,
) {
  function processNode(dataNode: DataNode) {
    const { key, children } = dataNode
    if (callback(key, dataNode) !== false) {
      traverseNodeKey(children || [], callback)
    }
  }

  treeData.forEach(processNode)
}

/** 计算选中范围，只考虑expanded情况以优化性能 */
export function calcRangeKeys({
  treeData,
  expandedKeys,
  startKey,
  endKey,
}: {
  treeData: DataNode[]
  expandedKeys: Key[]
  startKey: Key
  endKey: Key
}): Key[] {
  const keys: Key[] = []
  let record: Record = Record.None

  if (startKey && startKey === endKey) {
    return [startKey]
  }
  if (!startKey || !endKey) {
    return []
  }

  function matchKey(key: Key) {
    return key === startKey || key === endKey
  }

  traverseNodeKey(treeData, (key: Key) => {
    if (record === Record.End) {
      return false
    }

    if (matchKey(key)) {
      keys.push(key)

      if (record === Record.None) {
        record = Record.Start
      } else if (record === Record.Start) {
        record = Record.End
        return false
      }
    } else if (record === Record.Start) {
      keys.push(key)
    }

    if (expandedKeys.indexOf(key) === -1) {
      return false
    }

    return true
  })

  return keys
}

export function convertDirectoryKeysToNodes(treeData: DataNode[], keys: Key[]) {
  const restKeys: Key[] = [...keys]
  const nodes: DataNode[] = []
  traverseNodeKey(treeData, (key: Key, node: DataNode) => {
    const index = restKeys.indexOf(key)
    if (index !== -1) {
      nodes.push(node)
      restKeys.splice(index, 1)
    }

    return !!restKeys.length
  })
  return nodes
}
