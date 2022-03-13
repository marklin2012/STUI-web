import React from 'react'
import { Slider } from '../..'
import '../../component/slider/style'
import './index.less'

export default () => {
  const marks = {
    0: '',
    20: '',
    40: '',
    60: '',
    80: '',
    100: '',
  }

  return (
    <div className="slider">
      <Slider marks={marks} defaultValue={40} />
      <div className="columnSpace" />
      <Slider marks={marks} defaultValue={40} disabled={true} />
    </div>
  )
}
