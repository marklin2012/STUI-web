import React from 'react'
import { Slider } from '../..'
import '../../component/slider/style'
import './index.less'

export default () => {
  const marks = {
    0: '0',
    50: '50',
    100: '100',
    150: '150',
    200: '200',
    250: '250',
    300: '300',
    370: '370',
  }

  return (
    <div className="slider">
      <Slider marks={marks} defaultValue={100} min={0} max={370} step={null} />
      <div className="columnSpace" />
      <Slider marks={marks} range={true} defaultValue={[50, 150]} min={0} max={370} />
    </div>
  )
}
