import React, { useState } from 'react'
import { Cascader, Radio } from '../..'
import './index.less'
import '../../component/cascader/style'
import { SizeType } from '../../component/_util/type'
import { RadioChangeEvent } from '../../component/radio'

function DifSizeCascader() {
  const [size, setSize] = useState('middle' as SizeType)

  const options = [
    {
      value: '广东省',
      label: '广东省',
      children: [
        {
          value: '深圳市',
          label: '深圳市',
          children: [
            {
              value: '福田区',
              label: '福田区',
              disabled: true,
            },
            {
              value: '南山区',
              label: '南山区',
            },
          ],
        },
        {
          value: '广州市',
          label: '广州市',
          disabled: true,
          children: [
            {
              value: '白云区',
              label: '白云区',
            },
          ],
        },
      ],
    },
    {
      value: '江苏省',
      label: '江苏省',
      children: [
        {
          value: '南京市',
          label: '南京市',
          children: [
            {
              value: '中华门',
              label: '中华门',
            },
          ],
        },
      ],
    },
  ]

  function onChange(value: any) {
    console.log(value)
  }

  function handleSizeChange(e: RadioChangeEvent) {
    const value = e.target.value
    if (value !== undefined && value !== size) {
      setSize(value)
    }
  }

  return (
    <div className="cascader">
      <Radio.Group value={size} size={size as SizeType} onChange={handleSizeChange}>
        <Radio.Button value="large">Large</Radio.Button>
        <Radio.Button value="middle">Default</Radio.Button>
        <Radio.Button value="small">Small</Radio.Button>
      </Radio.Group>
      <div className="columnSpace" />
      <Cascader size={size} options={options} onChange={onChange} placeholder={'请选择'} />
    </div>
  )
}

export default () => <DifSizeCascader />
