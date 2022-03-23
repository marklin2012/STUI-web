import React from 'react'

interface BreadcrumbSeparatorInterface extends React.FC {
  BREADCRUMB_SEPARATOR: boolean
}

const BreadcrumbSeparator: BreadcrumbSeparatorInterface = ({ children }) => {
  const prefixCls = 'st-breadcrumb'

  return <span className={`${prefixCls}-separator`}>{children || '/'}</span>
}

BreadcrumbSeparator.BREADCRUMB_SEPARATOR = true

export default BreadcrumbSeparator
