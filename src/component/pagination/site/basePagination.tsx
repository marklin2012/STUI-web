import React from 'react'
import { Pagination } from '../../..'
import './index.less'
import '../style'

export default () => {
  return (
    <div className="pagination">
      <Pagination defaultCurrent={1} total={50} />
    </div>
  )
}
