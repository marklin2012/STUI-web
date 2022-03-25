import React from 'react'
import { Pagination } from '../../..'
import './index.less'
import '../style'

export default () => {
  function onChange(page: number, pageSize: number) {
    console.log('page: ', page, 'pageSize: ', pageSize)
  }

  return (
    <div className="pagination">
      <Pagination showQuickJumper defaultCurrent={2} total={500} onChange={onChange} />
    </div>
  )
}
