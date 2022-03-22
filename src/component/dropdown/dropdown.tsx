import React from 'react'
import RcDropdown from 'rc-dropdown'
import classNames from 'classnames'
import { DirectionType, tuple } from '../_util/type'
import DropdownButton from './dropdown-button'
import Icon from '../icon'
import { cloneElement } from '../_util/reactNode'

const Placements = tuple(
  'topLeft',
  'topCenter',
  'topRight',
  'bottomLeft',
  'bottomCenter',
  'bottomRight',
)

type Placement = typeof Placements[number]

type OverlayFunc = () => React.ReactElement

type Align = {
  points?: [string, string]
  offset?: [number, number]
  targetOffset?: [number, number]
  overflow?: {
    adjustX?: boolean
    adjustY?: boolean
  }
  useCssRight?: boolean
  useCssBottom?: boolean
  useCssTransform?: boolean
}

export interface DropdownProps {
  arrow?: boolean
  trigger?: ('click' | 'hover' | 'contextMenu')[]
  overlay: React.ReactElement | OverlayFunc
  onVisibleChange?: (visible: boolean) => void
  visible?: boolean
  disabled?: boolean
  destroyPopupOnHide?: boolean
  align?: Align
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement
  prefixCls?: string
  className?: string
  transitionName?: string
  placement?: Placement
  overlayClassName?: string
  overlayStyle?: React.CSSProperties
  forceRender?: boolean
  mouseEnterDelay?: number
  mouseLeaveDelay?: number
  openClassName?: string
  direction?: DirectionType
}

interface DropdownInterface extends React.FC<DropdownProps> {
  Button: typeof DropdownButton
}

const Dropdown: DropdownInterface = (props) => {
  const getTransitionName = () => {
    const rootPrefixCls = 'st'
    const { placement = '', transitionName } = props
    if (transitionName !== undefined) {
      return transitionName
    }
    if (placement.indexOf('top') >= 0) {
      return `${rootPrefixCls}-slide-down`
    }
    return `${rootPrefixCls}-slide-up`
  }

  const renderOverlay = (prefixCls: string) => {
    const { overlay } = props
    let overlayNode
    if (typeof overlay === 'function') {
      overlayNode = (overlay as OverlayFunc)()
    } else {
      overlayNode = overlay
    }
    overlayNode = React.Children.only(
      typeof overlayNode === 'string' ? <span>{overlayNode}</span> : overlayNode,
    )

    const overlayProps = overlayNode.props

    const { selectable = false, expandIcon } = overlayProps

    const overlayNodeExpanIcon =
      typeof expandIcon !== 'undefined' && React.isValidElement(expandIcon) ? (
        expandIcon
      ) : (
        <span className={`${prefixCls}-menu-submenu-arrow`}>
          <Icon icon={'angle-right'} className={`${prefixCls}-menu-submenu-arrow-icon`} />
        </span>
      )

    const fixedModeOverlay =
      typeof overlayNode.type === 'string'
        ? overlayNode
        : cloneElement(overlayNode, {
            mode: 'vertical',
            selectable,
            expandIcon: overlayNodeExpanIcon,
          })

    return fixedModeOverlay as React.ReactElement
  }

  const {
    arrow,
    prefixCls: customPrefixCls,
    children,
    trigger,
    disabled,
    getPopupContainer,
    overlayClassName,
    direction,
  } = props

  const getPlacement = () => {
    const { placement } = props
    if (placement !== undefined) {
      return placement
    }
    return direction === 'rtl' ? ('bottomRight' as Placement) : ('bottomLeft' as Placement)
  }

  const prefixCls = customPrefixCls ?? 'st-dropdown'
  const child = React.Children.only(children) as React.ReactElement<any>

  const dropdownTrigger = cloneElement(child, {
    className: classNames(
      `${prefixCls}-trigger`,
      {
        [`${prefixCls}-rtl`]: direction === 'rtl',
      },
      child.props.className,
    ),
    disabled,
  })

  const overlayClassNameCustom = classNames(overlayClassName, {
    [`${prefixCls}-rtl`]: direction === 'rtl',
  })

  const triggerActions = disabled ? [] : trigger

  let alignPoint
  if (triggerActions && triggerActions.indexOf('contextMenu') !== -1) {
    alignPoint = true
  }

  return (
    <RcDropdown
      arrow={arrow}
      alignPoint={alignPoint}
      {...props}
      overlayClassName={overlayClassNameCustom}
      prefixCls={prefixCls}
      getPopupContainer={getPopupContainer}
      transitionName={getTransitionName()}
      trigger={triggerActions}
      overlay={() => renderOverlay(prefixCls)}
      placement={getPlacement()}
    >
      {dropdownTrigger}
    </RcDropdown>
  )
}

Dropdown.Button = DropdownButton

Dropdown.defaultProps = {
  mouseEnterDelay: 0.15,
  mouseLeaveDelay: 0.1,
}

export default Dropdown
