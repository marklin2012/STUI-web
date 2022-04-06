import React from 'react'
import { Carousel } from '../../..'
import '../style'
import './index.less'

export default () => {
  const contentStyle = {
    height: '200px',
    color: '#fff',
    lineHeight: '200px',
    textAlign: 'center',
    background: '#095BF9',
  } as React.CSSProperties

  function onChange(currentSlider: number) {
    console.log(currentSlider)
  }

  return (
    <div className="carousel">
      <Carousel afterChange={onChange} arrows>
        <div>
          <h3 style={contentStyle}>1</h3>
        </div>
        <div>
          <h3 style={contentStyle}>2</h3>
        </div>
        <div>
          <h3 style={contentStyle}>3</h3>
        </div>
        <div>
          <h3 style={contentStyle}>4</h3>
        </div>
      </Carousel>
    </div>
  )
}
