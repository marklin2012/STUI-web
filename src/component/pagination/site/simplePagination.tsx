import React from 'react'
import { Pagination } from '../../..'
import './index.less'
import '../style'

export default () => {
  return (
    <div className="pagination">
      <Pagination simple defaultCurrent={1} total={50} />
      <div className="columnSpace" />
      <Pagination simple defaultCurrent={1} total={50} disabled />
    </div>
  )
}
