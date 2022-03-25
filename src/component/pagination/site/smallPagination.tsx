import React from 'react'
import { Pagination } from '../../..'
import './index.less'
import '../style'

export default () => {
  return (
    <div className="pagination">
      <Pagination size="small" total={50} />
      <div className="columnSpace" />
      <Pagination size="small" total={50} showSizeChanger showQuickJumper />
      <div className="columnSpace" />
      <Pagination size="small" total={50} showSizeChanger showQuickJumper disabled />
    </div>
  )
}
