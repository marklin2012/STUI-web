import React, { useState } from 'react'
import { Table, Input, Button } from '../../..'
import '../style'
import './index.less'

interface Item {
  key: string
  title1: string
  title2: string
  title3: string
}

const originData: Item[] = []
for (let i = 0; i < 4; i++) {
  originData.push({
    key: i.toString(),
    title1: '内容',
    title2: i.toString(),
    title3: '内容',
  })
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean
  dataIndex: string
  title: any
  record: Item
  index: number
  children: React.ReactNode
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = <Input />

  return <td {...restProps}>{editing ? <div style={{ margin: 0 }}>{inputNode}</div> : children}</td>
}

function EditableTable() {
  const [data, setData] = useState(originData)
  const [editingKey, setEditingKey] = useState('')

  const isEditing = (record: Item) => record.key === editingKey

  const edit = (record: Partial<Item> & { key: React.Key }) => {
    setEditingKey(record.key)
  }

  const save = async (key: React.Key) => {
    try {
      const newData = [...data]
      const index = newData.findIndex((item) => key === item.key)
      if (index > -1) {
        const item = newData[index]
        newData.splice(index, 1, { ...item })
        setData(newData)
        setEditingKey('')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const columns = [
    {
      title: '标题1',
      dataIndex: 'title1',
      key: 'title1',
      editable: true,
    },
    {
      title: '标题2',
      dataIndex: 'title2',
      key: 'title2',
      editable: true,
    },
    {
      title: '标题3',
      dataIndex: 'title3',
      key: 'title3',
      editable: true,
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render: (_: any, record: Item) => {
        const editable = isEditing(record)
        return editable ? (
          <Button type={'link'} onClick={() => save(record.key)}>
            保存
          </Button>
        ) : (
          <Button type={'link'} onClick={() => edit(record)}>
            编辑
          </Button>
        )
      },
    },
  ]

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    }
  })

  return (
    <div className="tableDemo">
      <Table
        components={{
          body: { cell: EditableCell },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName={'editable-row'}
      />
    </div>
  )
}

export default () => <EditableTable />
