import React from 'react'
import { Slider } from '../..'
import '../../component/slider/style'
import './index.less'

export default () => {
  return (
    <div className="slider">
      <Slider defaultValue={30} tooltipVisible={true} />
      <div className="columnSpace" />
      <Slider range={true} defaultValue={[20, 60]} tooltipVisible={true} />
    </div>
  )
}
