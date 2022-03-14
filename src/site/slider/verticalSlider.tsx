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
      <div className="vertical">
        <Slider defaultValue={30} vertical={true} tooltipPlacement={'top'} />
      </div>
      <div className="vertical">
        <Slider range={true} defaultValue={[20, 50]} vertical={true} tooltipPlacement={'top'} />
      </div>
      <div className="vertical">
        <Slider defaultValue={20} vertical={true} tooltipPlacement={'top'} tooltipVisible={true} />
      </div>
      <div className="vertical">
        <Slider
          defaultValue={100}
          vertical={true}
          marks={marks}
          max={370}
          tooltipPlacement={'top'}
        />
      </div>
    </div>
  )
}
