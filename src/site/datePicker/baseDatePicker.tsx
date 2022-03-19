import React from 'react'
import { DatePicker } from '../..'
import '../../component/datePicker/style'
import './index.less'

export default () => {
  function onChange(date: any, dateString: any) {
    console.log(date, dateString)
  }

  return (
    <div className="datePicker">
      <DatePicker onChange={onChange} />
      <div className="columnSpace" />
      <DatePicker onChange={onChange} picker="week" />
      <div className="columnSpace" />
      <DatePicker onChange={onChange} picker="month" />
      <div className="columnSpace" />
      <DatePicker onChange={onChange} picker="quarter" />
      <div className="columnSpace" />
      <DatePicker onChange={onChange} picker="year" />
    </div>
  )
}
