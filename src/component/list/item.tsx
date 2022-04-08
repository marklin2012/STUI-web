import React from 'react'
import classNames from 'classnames'
import { ListGridType, ListContext } from './index'
import { Col } from '../grids'
import { cloneElement } from '../_util/reactNode'

export interface ListItemProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  children?: React.ReactNode
  prefixCls?: string
  style?: React.CSSProperties
  extra?: React.ReactNode
  actions?: React.ReactNode[]
  grid?: ListGridType
  colStyle?: React.CSSProperties
}

export interface ListItemMetaProps {
  avatar?: React.ReactNode
  className?: string
  children?: React.ReactNode
  description?: React.ReactNode
  prefixCls?: string
  style?: React.CSSProperties
  title?: React.ReactNode
}

export const Meta: React.FC<ListItemMetaProps> = ({
  prefixCls: customPrefixCls,
  className,
  avatar,
  title,
  description,
  ...restProps
}) => {
  const prefixCls = customPrefixCls ?? 'st-list'
  const classStr = classNames(`${prefixCls}-item-meta`, className)

  const content = (
    <div className={`${prefixCls}-item-meta-content`}>
      {title && <h4 className={`${prefixCls}-item-meta-title`}>{title}</h4>}
      {description && <div className={`${prefixCls}-item-meta-description`}>{description}</div>}
    </div>
  )

  return (
    <div {...restProps} className={classStr}>
      {avatar && <div className={`${prefixCls}-item-meta-avatar`}>{avatar}</div>}
      {(title || description) && content}
    </div>
  )
}

export interface ListItemTypeProps extends React.FC<ListItemProps> {
  Meta: typeof Meta
}

const Item: ListItemTypeProps = ({
  prefixCls: customPrefixCls,
  children,
  actions,
  extra,
  className,
  colStyle,
  ...restProps
}) => {
  const { grid, itemLayout } = React.useContext(ListContext)

  const isItemContainesTextNodeAndNotSingular = () => {
    let result
    React.Children.forEach(children, (element: React.ReactNode) => {
      if (typeof element === 'string') {
        result = true
      }
    })
    return result && React.Children.count(children) > 1
  }

  const isFlexMode = () => {
    if (itemLayout === 'vertical') {
      return !!extra
    }
    return !isItemContainesTextNodeAndNotSingular()
  }

  const prefixCls = customPrefixCls ?? 'st-list'
  const actionsConent = actions && actions.length > 0 && (
    <ul className={`${prefixCls}-item-action`} key="actions">
      {actions.map((action: React.ReactNode, i: number) => (
        <li key={`${prefixCls}-item-action-${i}`}>
          {action}
          {i !== actions.length - 1 && <em className={`${prefixCls}-item-action-split`} />}
        </li>
      ))}
    </ul>
  )
  const Element = grid ? 'div' : 'li'
  const itemChildren = (
    <Element
      {...(restProps as any)}
      className={classNames(
        `${prefixCls}-item`,
        {
          [`${prefixCls}-item-no-flex`]: !isFlexMode(),
        },
        className,
      )}
    >
      {itemLayout === 'vertical' && extra
        ? [
            <div className={`${prefixCls}-item-main`} key={'content'}>
              {children}
              {actionsConent}
            </div>,
            <div className={`${prefixCls}-item-extra`} key={'extra'}>
              {extra}
            </div>,
          ]
        : [children, actionsConent, cloneElement(extra, { key: 'extra' })]}
    </Element>
  )

  return grid ? (
    <Col flex={1} style={colStyle}>
      {itemChildren}
    </Col>
  ) : (
    itemChildren
  )
}

Item.Meta = Meta

export default Item
