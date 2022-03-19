import React from 'react'
import { TimePicker } from '../..'
import '../../component/timePicker/style'
import '../../component/datePicker/style'
import './index.less'
import moment from 'moment'

export default () => {
  function onChange(time: moment.Moment | null, timeString?: string) {
    console.log(time, timeString)
  }

  return (
    <div className="timePicker">
      <TimePicker onChange={onChange} />
      <div className="columnSpace" />
      <TimePicker.RangePicker />
    </div>
  )
}
