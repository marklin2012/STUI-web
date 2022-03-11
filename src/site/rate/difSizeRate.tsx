import React from 'react'
import { Rate } from '../..'
import '../../component/rate/style'
import './index.less'

export default () => {
  return (
    <div className="rate">
      <Rate allowHalf={true} defaultValue={3.5} size={'sm'} />
      <div className="columnSpace" />
      <Rate allowHalf={true} defaultValue={3.5} />
      <div className="columnSpace" />
      <Rate allowHalf={true} defaultValue={3.5} size={'lg'} />
    </div>
  )
}
