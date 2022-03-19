import React from 'react'
import { DatePicker } from '../..'
import '../../component/datePicker/style'
import './index.less'

const { RangePicker } = DatePicker

export default () => {
  function onChange(date: any, dateString: any) {
    console.log(date, dateString)
  }

  return (
    <div className="datePicker">
      <RangePicker onChange={onChange} />
      <div className="columnSpace" />
      <RangePicker onChange={onChange} picker="week" />
      <div className="columnSpace" />
      <RangePicker onChange={onChange} picker="month" />
      <div className="columnSpace" />
      <RangePicker onChange={onChange} picker="quarter" />
      <div className="columnSpace" />
      <RangePicker onChange={onChange} picker="year" />
    </div>
  )
}
