import React, { isValidElement } from 'react'
import { Item, MenuItemProps as RcMenuItemProps } from 'rc-menu'
import classNames from 'classnames'
import MenuContext from './menuContext'
import Tooltip, { TooltipProps } from '../tooltip'
import toArray from 'rc-util/lib/Children/toArray'
import { cloneElement } from '../_util/reactNode'

export interface MenuItemProps extends Omit<RcMenuItemProps, 'title'> {
  icon?: React.ReactNode
  danger?: boolean
  title?: React.ReactNode
}

class MenuItem extends React.Component<MenuItemProps> {
  static contextType = MenuContext

  renderItemChildren(inlineCollapsed: boolean) {
    const { prefixCls, firstLevel } = this.context
    const { icon, children } = this.props

    const wrapNode = <span className={`${prefixCls}-title-content`}>{children}</span>
    // 依赖 span 来隐藏文字,有 icon 属性，则内部包裹一个 span
    if (!icon || (isValidElement(children) && children.type === 'span')) {
      if (children && inlineCollapsed && firstLevel && typeof children === 'string') {
        return <div className={`${prefixCls}-inline-collapsed-noicon`}>{children.charAt(0)}</div>
      }
    }
    return wrapNode
  }

  renderItem = () => {
    const { prefixCls, firstLevel, inlineCollapsed, direction, disableMenuItemTitleTooltip } =
      this.context
    const { className, children } = this.props
    const { title, icon, danger, ...restProps } = this.props

    let tooltipTitle = title
    if (typeof title === 'undefined') {
      tooltipTitle = firstLevel ? children : ''
    } else if (title === false) {
      tooltipTitle = ''
    }
    const tooltipProps: TooltipProps = {
      title: tooltipTitle,
    }

    if (!inlineCollapsed) {
      tooltipProps.title = null
      // Reset `visible` to fix control mode tooltip display not correct
      tooltipProps.visible = false
    }
    const childrenLength = toArray(children).length

    let returnNode = (
      <Item
        {...restProps}
        className={classNames(
          {
            [`${prefixCls}-item-danger`]: danger,
            [`${prefixCls}-item-only-child`]: (icon ? childrenLength + 1 : childrenLength) === 1,
          },
          className,
        )}
        title={typeof title === 'string' ? title : undefined}
      >
        {cloneElement(icon, {
          className: classNames(
            isValidElement(icon) ? icon.props?.className : '',
            `${prefixCls}-item-icon`,
          ),
        })}
        {this.renderItemChildren(inlineCollapsed)}
      </Item>
    )

    if (!disableMenuItemTitleTooltip) {
      returnNode = (
        <Tooltip
          {...tooltipProps}
          placement={direction === 'rtl' ? 'left' : 'right'}
          overlayClassName={`${prefixCls}-inline-collapsed-tooltip`}
        >
          {returnNode}
        </Tooltip>
      )
    }

    return returnNode
  }

  render() {
    return this.renderItem()
  }
}

export default MenuItem
