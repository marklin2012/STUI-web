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
    background: 'red',
  } as React.CSSProperties

  return (
    <div className="carousel">
      <Carousel autoplay>
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
