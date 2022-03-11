import React from 'react'
import { Icon, Rate } from '../..'
import '../../component/rate/style'
import './index.less'

function ChangePreviewRate() {
  const [valueNum, setValueNum] = React.useState(3.5)

  const [changed, setChanged] = React.useState(false)

  function ChangedHandle() {
    setChanged(!changed)
  }

  function ChangedValueHandle(num: number) {
    if (num !== undefined && valueNum !== num) {
      setValueNum(num)
    }
  }

  const rateRender = () => {
    const rateStrRender = <span>{`Rating: ${valueNum}`}</span>
    const rateIconRender = (
      <Rate allowHalf={true} defaultValue={valueNum} onChange={ChangedValueHandle} />
    )
    return (
      <div className="sub">
        {changed ? rateStrRender : rateIconRender}
        <div className="space" />
        <Icon icon={'right-left'} color="grey" />
        <div className="space" />
        {changed ? rateIconRender : rateStrRender}
      </div>
    )
  }

  return (
    <div className="rate">
      <span className="change" onClick={ChangedHandle}>
        切换预览
      </span>
      <div className="columnSpace" />
      <br />
      {rateRender()}
    </div>
  )
}

export default () => <ChangePreviewRate />
