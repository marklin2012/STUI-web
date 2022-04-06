import React, { useState } from 'react'
import { DotPosition } from '..'
import { Carousel, Radio, RadioChangeEvent } from '../../..'
import '../style'
import './index.less'

function DifPosition() {
  const contentStyle = {
    height: '200px',
    color: '#fff',
    lineHeight: '200px',
    textAlign: 'center',
  } as React.CSSProperties

  const [position, setPosition] = useState('top')

  function changeTabPosition(e: RadioChangeEvent) {
    if (position !== e.target.value) {
      setPosition(e.target.value)
    }
  }

  function onChange(currentSlider: number) {
    console.log(currentSlider)
  }

  return (
    <div className="carousel">
      <Radio.Group value={position} onChange={changeTabPosition}>
        <Radio.Button value="top">top</Radio.Button>
        <Radio.Button value="bottom">bottom</Radio.Button>
        <Radio.Button value="left">left</Radio.Button>
        <Radio.Button value="right">right</Radio.Button>
      </Radio.Group>
      <Carousel afterChange={onChange} dotPosition={position as DotPosition}>
        <div>
          <h3 style={{ ...contentStyle, background: '#095BF9' }}>1</h3>
        </div>
        <div>
          <h3 style={{ ...contentStyle, background: '#A6C4FF' }}>2</h3>
        </div>
        <div>
          <h3 style={{ ...contentStyle, background: '#49C564' }}>3</h3>
        </div>
        <div>
          <h3 style={{ ...contentStyle, background: '#FFA927' }}>4</h3>
        </div>
      </Carousel>
    </div>
  )
}

export default () => <DifPosition />
