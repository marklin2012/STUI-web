import React, { useState } from 'react'
import { Tabs } from '../../..'
import './index.less'
import '../style'

const { TabPane } = Tabs

const initialPanes = [
  { title: 'Tab 1', content: '这里是文字内容1', key: '1' },
  { title: 'Tab 2', content: '这里是文字内容2', key: '2' },
  { title: 'Tab 3', content: '这里是文字内容3', key: '3', closable: false },
]

let newTabIndex = 0

function AddRemoveTabs() {
  const [activeKey, setActiveKey] = useState(initialPanes[0].key)
  const [panes, setPanes] = useState(initialPanes)

  function onChange(key: string) {
    if (key !== activeKey) {
      setActiveKey(key)
    }
  }

  function onEdit(targetKey: React.MouseEvent | React.KeyboardEvent | string, action: string) {
    console.log(targetKey, action)
    if (action === 'add') {
      add()
    } else {
      remove(targetKey as string)
    }
  }

  function add() {
    newTabIndex += 1
    const newActiveKey = `newTab ${newTabIndex}`
    let newPanes = [...panes]
    newPanes.push({
      title: 'New Tab',
      content: `这里是新增文字内容 ${newTabIndex}`,
      key: newActiveKey,
    })
    setActiveKey(newActiveKey)
    setPanes(newPanes)
  }

  function remove(key: string) {
    let newActiveKey = activeKey
    let lastIndex = 0
    panes.forEach((pane, i) => {
      if (pane.key === key) {
        lastIndex = i - 1
      }
    })
    const newPanes = panes.filter((pane) => pane.key !== key)
    if (newPanes.length && newActiveKey === key) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key
      } else {
        newActiveKey = newPanes[0].key
      }
    }
    setActiveKey(newActiveKey)
    setPanes(newPanes)
  }

  return (
    <div className="tabs">
      <Tabs type="editable-card" activeKey={activeKey} onChange={onChange} onEdit={onEdit}>
        {panes.map((pane) => {
          return (
            <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>
              {pane.content}
            </TabPane>
          )
        })}
      </Tabs>
    </div>
  )
}

export default () => <AddRemoveTabs />
