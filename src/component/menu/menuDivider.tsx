import React from 'react'
import classNames from 'classnames'
import { Divider } from 'rc-menu'

export interface MenuDividerProps extends React.HtmlHTMLAttributes<HTMLElement> {
  className?: string
  prefixCls?: string
  style?: React.CSSProperties
  dashed?: boolean
}

const MenuDivider: React.FC<MenuDividerProps> = ({
  prefixCls: customPrefixCls,
  className,
  dashed,
  ...restProps
}) => {
  const prefixCls = customPrefixCls ?? 'st-menu'
  const classString = classNames(
    {
      [`${prefixCls}-item-divider-dashed`]: !!dashed,
    },
    className,
  )

  return <Divider className={classString} {...restProps} />
}

export default MenuDivider
