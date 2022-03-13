import React, { ChangeEvent, useState } from 'react'
import { Input, Slider } from '../..'
import '../../component/slider/style'
import './index.less'

function HasInputSlider() {
  const [value1, setVaule1] = useState(1)
  const [value2, setVaule2] = useState(0.05)

  function onChange1(value: number) {
    setVaule1(value)
  }

  function inputOnChange1(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value
    if (value.length == 0) return
    let num = Number(value)
    if (num !== null && num !== 0) {
      if (num < 1) {
        num = 1
      } else if (num > 20) {
        num = 20
      }
      setVaule1(num)
    }
  }

  function onChange2(value: number) {
    setVaule2(value)
  }

  function inputOnChange2(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value
    if (value.length == 0) return
    let num = Number(value)
    if (num !== null && num !== 0) {
      if (num < 0) {
        num = 0
      } else if (num > 1) {
        num = 1
      }
      setVaule2(num)
    }
  }

  return (
    <div className="slider">
      <div className="subRow">
        <div className="subSlider">
          <Slider min={1} max={20} onChange={onChange1} value={value1} />
        </div>
        <div className="rowSpace"></div>
        <div className="subInput">
          <Input min={1} max={20} defaultValue={value1.toString()} onChange={inputOnChange1} />
        </div>
      </div>
      <div className="columnSpace"></div>
      <div className="subRow">
        <div className="subSlider">
          <Slider min={0} max={1} step={0.01} onChange={onChange2} value={value2} />
        </div>
        <div className="rowSpace"></div>
        <div className="subInput">
          <Input min={0} max={1} defaultValue={value2.toString()} onChange={inputOnChange2} />
        </div>
      </div>
    </div>
  )
}

export default () => <HasInputSlider />
