import React from 'react'
import { Pagination } from '../../..'
import './index.less'
import '../style'

function itemRender(
  page: number,
  type: 'page' | 'prev' | 'next' | 'jump-prev' | 'jump-next',
  element: React.ReactNode,
) {
  if (type === 'prev') {
    return <a className="pagination-itemBtn">上一页</a>
  }
  if (type === 'next') {
    return <a className="pagination-itemBtn">下一页</a>
  }
  return element
}

export default () => {
  return (
    <div className="pagination">
      <Pagination total={500} itemRender={itemRender} showQuickJumper />
    </div>
  )
}
