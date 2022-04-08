import React from 'react'
import { ListSize } from '..'
import { List, Radio, RadioChangeEvent } from '../../..'
import '../style'
import './index.less'

const data = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.',
]

function SimpleList() {
  const [size, setSize] = React.useState<ListSize>('default')

  function onChange(e: RadioChangeEvent) {
    setSize(e.target.value)
  }

  return (
    <div className="listDemo">
      <Radio.Group value={size} onChange={onChange}>
        <Radio.Button value="small">small</Radio.Button>
        <Radio.Button value="default">default</Radio.Button>
        <Radio.Button value="large">large</Radio.Button>
      </Radio.Group>
      <div className="columnSpace" />
      <List
        header={<div>头部文字</div>}
        footer={<div>尾部文字</div>}
        bordered
        size={size}
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <span>
              <mark>{'[ITEM]'}</mark>
            </span>
            {item}
          </List.Item>
        )}
      />
    </div>
  )
}

export default () => <SimpleList />
