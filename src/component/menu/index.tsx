import React from 'react'
import RcMenu, { ItemGroup, MenuProps as RcMenuprops, MenuItemGroupProps } from 'rc-menu'
import classNames from 'classnames'
import { memoize } from 'lodash'
import { DirectionType } from '../_util/type'
import MenuContext, { MenuContextProps } from './menuContext'
import omit from 'rc-util/lib/omit'
import collapseMotion from '../_util/motion'
import Icon from '../icon'
import { cloneElement } from '../_util/reactNode'
import MenuDivider, { MenuDividerProps } from './menuDivider'
import MenuItem, { MenuItemProps } from './menuItem'
import SubMenu, { SubMenuProps } from './subMenu'

export type { SubMenuProps, MenuItemProps, MenuDividerProps, MenuItemGroupProps }

export type MenuMode = 'vertical' | 'vertical-left' | 'vertical-right' | 'horizontal' | 'inline'

export interface MenuProps extends RcMenuprops {
  inlineIndent?: number
  _internalDisableMenuItemTitleTooltip?: boolean
}

type InternalMenuProps = MenuProps & {
  collapsedWidth?: string | number
}

class InternalMenu extends React.Component<InternalMenuProps> {
  constructor(props: InternalMenuProps) {
    super(props)
  }

  getInlineCollapsed() {
    const { inlineCollapsed } = this.props
    return inlineCollapsed
  }

  getMemoizedContextValue = memoize(
    (
      cls: string,
      collapsed: boolean | undefined,
      dir: DirectionType,
      disableMenuItemTitleTooltip: boolean | undefined,
    ): MenuContextProps => ({
      prefixCls: cls,
      inlineCollapsed: collapsed || false,
      direction: dir,
      firstLevel: true,
      disableMenuItemTitleTooltip,
    }),
  )

  renderMenu = () => {
    const rootPrefixCls = 'st'

    const {
      prefixCls: customizePrefixCls,
      className,
      expandIcon,
      _internalDisableMenuItemTitleTooltip,
      getPopupContainer,
      direction,
      ...restProps
    } = this.props

    const passedProps = omit(restProps, ['collapsedWidth'])
    const inlineCollapsed = this.getInlineCollapsed()

    const defaultMotions = {
      horizontal: { motionName: `${rootPrefixCls}-slide-up` },
      inline: collapseMotion,
      other: { motionName: `${rootPrefixCls}-zoom-big` },
    }

    const prefixCls = customizePrefixCls ?? 'st-menu'
    const menuClassName = classNames(`${prefixCls}-light`, className)

    // TODO: refactor menu with function component
    const contextValue = this.getMemoizedContextValue(
      prefixCls,
      inlineCollapsed,
      direction,
      _internalDisableMenuItemTitleTooltip,
    )

    return (
      <MenuContext.Provider value={contextValue}>
        <RcMenu
          getPopupContainer={getPopupContainer}
          overflowedIndicator={<Icon icon={'angle-down'} />}
          overflowedIndicatorPopupClassName={`${prefixCls}-light`}
          {...passedProps}
          inlineCollapsed={inlineCollapsed}
          className={menuClassName}
          prefixCls={prefixCls}
          direction={direction}
          defaultMotions={defaultMotions}
          expandIcon={cloneElement(expandIcon, {
            className: `${prefixCls}-submenu-expand-icon`,
          })}
        />
      </MenuContext.Provider>
    )
  }

  render() {
    return this.renderMenu()
  }
}

class Menu extends React.Component<MenuProps, {}> {
  static Divider = MenuDivider

  static Item = MenuItem

  static SubMenu = SubMenu

  static ItemGroup = ItemGroup

  render() {
    return <InternalMenu {...this.props} />
  }
}

export default Menu
