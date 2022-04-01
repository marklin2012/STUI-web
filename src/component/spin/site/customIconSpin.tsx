import React from 'react'
import { Spin, Icon } from '../../..'
import '../style'
import './index.less'

export default () => {
  return (
    <div className="spin-flex">
      <Spin size="small" />
      <div className="rowSpace" />
      <Spin size="small" indicator={<Icon icon={'circle-notch'} color={'red'} />} />
      <div className="rowSpace" />
      <Spin size="small" indicator={<Icon icon={'sun'} color={'green'} />} />
    </div>
  )
}
