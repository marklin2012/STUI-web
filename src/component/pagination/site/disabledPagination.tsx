import React from 'react'
import { Pagination } from '../../..'
import './index.less'
import '../style'

export default () => {
  return (
    <div className="pagination">
      <Pagination defaultCurrent={6} total={500} disabled />
    </div>
  )
}
