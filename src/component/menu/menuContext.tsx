import { createContext } from 'react'
import { DirectionType } from '../_util/type'

export interface MenuContextProps {
  prefixCls: string
  inlineCollapsed: boolean
  direction?: DirectionType
  firstLevel: boolean
  disableMenuItemTitleTooltip?: boolean
}

const MenuContext = createContext<MenuContextProps>({
  prefixCls: '',
  firstLevel: true,
  inlineCollapsed: false,
})

export default MenuContext
