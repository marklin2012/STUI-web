import React from 'react'
import { Cascader } from '../..'
import './index.less'
import '../../component/cascader/style'

export default () => {
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

  return (
    <div className="cascader">
      <Cascader options={options} onChange={onChange} placeholder={'请选择'} />
    </div>
  )
}
