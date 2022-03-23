import React from 'react'
import Dropdown, { DropdownProps } from '../dropdown/dropdown'
import Icon from '../icon'
import { prefixClsIcon } from '../_util/prefixClsIcon'

export interface BreadcrumbItemProps {
  prefixCls?: string
  className?: string
  separator?: React.ReactNode
  href?: string
  overlay?: DropdownProps['overlay']
  dropdownProps?: DropdownProps
  onClick?: React.MouseEventHandler<HTMLAnchorElement | HTMLSpanElement>
}

interface BreadcrumbItemInterface extends React.FC<BreadcrumbItemProps> {
  BREADCRUMB_ITEM: boolean
}

const BreadcrumbItem: BreadcrumbItemInterface = ({
  prefixCls: customPrefixCls,
  separator = '/',
  children,
  overlay,
  dropdownProps,
  ...restProps
}) => {
  const prefixCls = customPrefixCls ?? 'st-breadcrumb'

  const renderBreadcrumbNode = (breadcrumbItem: React.ReactNode) => {
    if (overlay) {
      return (
        <Dropdown overlay={overlay} placement={'bottomCenter'} {...dropdownProps}>
          <span className={`${prefixCls}-overlay-link`}>
            {breadcrumbItem}
            {prefixClsIcon(<Icon icon={'angle-down'} />)}
          </span>
        </Dropdown>
      )
    }
    return breadcrumbItem
  }

  let link
  if ('href' in restProps) {
    link = (
      <a className={`${prefixCls}-link`} {...restProps}>
        {children}
      </a>
    )
  } else {
    link = (
      <span className={`${prefixCls}-link`} {...restProps}>
        {children}
      </span>
    )
  }

  link = renderBreadcrumbNode(link)
  if (children) {
    return (
      <span>
        {link}
        {separator && <span className={`${prefixCls}-separator`}>{separator}</span>}
      </span>
    )
  }
  return null
}

BreadcrumbItem.BREADCRUMB_ITEM = true

export default BreadcrumbItem
