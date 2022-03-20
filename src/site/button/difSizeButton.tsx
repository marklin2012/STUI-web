import React, { useState } from 'react'
import { Button, Icon, Radio, RadioChangeEvent } from '../..'
import './index.less'
import '../../component/button/style'
import { SizeType } from '../../component/_util/type'

function DifSizeButton() {
  const [size, setSize] = useState('middle')

  function handleSizeChange(e: RadioChangeEvent) {
    const value = e.target.value
    if (value !== undefined && value !== size) {
      setSize(value)
    }
  }

  return (
    <div className="button">
      <Radio.Group value={size} size={size as SizeType} onChange={handleSizeChange}>
        <Radio.Button value="large">Large</Radio.Button>
        <Radio.Button value="middle">Default</Radio.Button>
        <Radio.Button value="small">Small</Radio.Button>
      </Radio.Group>
      <div className="columnSpace" />
      <div className="flex">
        <Button type="primary" size={size as SizeType}>
          按钮
        </Button>
        <div className="rowSpace" />
        <Button
          type="primary"
          shape="circle"
          icon={<Icon icon={'star'} />}
          size={size as SizeType}
        />
      </div>
    </div>
  )
}

export default () => <DifSizeButton />
