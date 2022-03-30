import React, { useState } from 'react'
import RcDrawer from 'rc-drawer'
import classNames from 'classnames'
import { DirectionType, tuple } from '../_util/type'
import useForceUpdate from '../_util/hooks/useForceUpdate'
import Icon from '../icon'

type DrawerRef = {
  push(): void
  pull(): void
}

const DrawerContext = React.createContext<DrawerRef | null>(null)

type EventType =
  | React.KeyboardEvent<HTMLDivElement>
  | React.MouseEvent<HTMLDivElement | HTMLButtonElement>

type getContainerFunc = () => HTMLElement

type ILevelMove = number | [number, number]

const PlacementTypes = tuple('top', 'right', 'bottom', 'left')

export type placementType = typeof PlacementTypes[number]

const SizeTypes = tuple('default', 'large')

export type sizeType = typeof SizeTypes[number]

export interface PushState {
  distance: string | number
}

export interface DrawerProps {
  autoFocus?: boolean
  closable?: boolean
  closeIcon?: React.ReactNode
  destroyOnClose?: boolean
  forceRender?: boolean
  getContainer?: string | HTMLElement | getContainerFunc | false
  maskClosable?: boolean
  mask?: boolean
  maskStyle?: React.CSSProperties
  style?: React.CSSProperties
  size?: sizeType
  /** Wrapper dom node style of header and body */
  drawerStyle?: React.CSSProperties
  headerStyle?: React.CSSProperties
  bodyStyle?: React.CSSProperties
  contentWrapperStyle?: React.CSSProperties
  title?: React.ReactNode
  visible?: boolean
  width?: number | string
  height?: number | string
  zIndex?: number
  prefixCls?: string
  push?: boolean | PushState
  placement?: placementType
  onClose?: (e: EventType) => void
  afterVisibleChange?: (visible: boolean) => void
  className?: string
  handler?: React.ReactNode
  keyboard?: boolean
  extra?: React.ReactNode
  footer?: React.ReactNode
  footerStyle?: React.CSSProperties
  level?: string | string[] | null | undefined
  levelMove?: ILevelMove | ((e: { target: HTMLElement; open: boolean }) => ILevelMove)
  direction?: DirectionType
}

// export interface IDrawerState {
//     push?: boolean;
// }

const defaultPushState: PushState = { distance: 180 }

const Drawer = React.forwardRef<DrawerRef, DrawerProps>(
  (
    {
      width,
      height,
      size = 'default',
      closable = true,
      placement = 'right' as placementType,
      maskClosable = true,
      mask = true,
      level = null,
      keyboard = true,
      push = defaultPushState,
      closeIcon = <Icon icon={'xmark'} />,
      bodyStyle,
      drawerStyle,
      prefixCls,
      className,
      direction,
      visible,
      children,
      zIndex,
      destroyOnClose,
      style,
      title,
      headerStyle,
      onClose,
      footer,
      footerStyle,
      extra,
      ...rest
    },
    ref,
  ) => {
    const forceUpdate = useForceUpdate()
    const [internalPush, setPush] = useState(false)
    const parentDrawer = React.useContext(DrawerContext)
    const destroyClose = React.useRef<boolean>(false)

    React.useEffect(() => {
      if (visible && parentDrawer) {
        parentDrawer.push()
      }

      return () => {
        if (parentDrawer) {
          parentDrawer.pull()
        }
      }
    }, [])

    React.useEffect(() => {
      if (parentDrawer) {
        if (visible) {
          parentDrawer.push()
        } else {
          parentDrawer.pull()
        }
      }
    }, [visible])

    const operations = React.useMemo(
      () => ({
        push() {
          if (push) {
            setPush(true)
          }
        },
        pull() {
          if (push) {
            setPush(false)
          }
        },
      }),
      [push],
    )

    React.useImperativeHandle(ref, () => operations, [operations])

    const isDestroyOnClose = destroyOnClose && !visible

    const onDestroyTransitionEnd = () => {
      if (!isDestroyOnClose) {
        return
      }
      if (!visible) {
        destroyClose.current = true
        forceUpdate()
      }
    }

    const getOffsetStyle = () => {
      if (!visible && !mask) {
        return {}
      }
      const offsetStyle: any = {}
      if (placement === 'left' || placement === 'right') {
        const defaultWidth = size === 'large' ? 736 : 378
        offsetStyle.width = typeof width === 'undefined' ? defaultWidth : width
      } else {
        const defaultHeight = size === 'large' ? 736 : 378
        offsetStyle.height = typeof height === 'undefined' ? defaultHeight : height
      }
      return offsetStyle
    }

    const getRcDrawerStyle = () => {
      const getPushTransform = (_placement?: placementType) => {
        let distance: number | string
        if (typeof push === 'boolean') {
          distance = push ? defaultPushState.distance : 0
        } else {
          distance = push!.distance
        }
        distance = parseFloat(String(distance || 0))
        if (_placement === 'left' || _placement === 'right') {
          return `translateX(${_placement === 'left' ? distance : -distance}px)`
        }
        if (_placement === 'top' || _placement === 'bottom') {
          return `translateY(${_placement === 'top' ? distance : -distance}px)`
        }
      }

      const offsetStyle = mask ? {} : getOffsetStyle()
      return {
        zIndex,
        transform: internalPush ? getPushTransform(placement) : undefined,
        ...offsetStyle,
        ...style,
      }
    }

    const closeIconNode = closable && (
      <button type="button" onClick={onClose} aria-label="close" className={`${prefixCls}-close`}>
        {closeIcon}
      </button>
    )

    function renderHeader() {
      if (!title && !closable) {
        return null
      }

      return (
        <div
          className={classNames(`${prefixCls}-header`, {
            [`${prefixCls}-header-close-only`]: closable && !title && !extra,
          })}
          style={headerStyle}
        >
          <div className={`${prefixCls}-header-title`}>
            {closeIconNode}
            {title && <div className={`${prefixCls}-title`}>{title}</div>}
          </div>
          {extra && <div className={`${prefixCls}-extra`}>{extra}</div>}
        </div>
      )
    }

    function renderFooter() {
      if (!footer) {
        return null
      }
      return (
        <div className={`${prefixCls}-footer`} style={footerStyle}>
          {footer}
        </div>
      )
    }

    const renderBody = () => {
      if (destroyClose.current && !visible) {
        return null
      }
      destroyClose.current = false

      const containerStyle: React.CSSProperties = {}
      if (isDestroyOnClose) {
        containerStyle.opacity = 0
        containerStyle.transition = 'opacity .3s'
      }

      return (
        <div
          className={`${prefixCls}-wrapper-body`}
          style={{
            ...containerStyle,
            ...drawerStyle,
          }}
          onTransitionEnd={onDestroyTransitionEnd}
        >
          {renderHeader()}
          <div className={`${prefixCls}-body`} style={bodyStyle}>
            {children}
          </div>
          {renderFooter()}
        </div>
      )
    }

    const drawerClassName = classNames(
      {
        'no-mask': !mask,
        [`${prefixCls}-rtl`]: direction === 'rtl',
      },
      className,
    )
    const offsetStyle = mask ? getOffsetStyle() : {}

    return (
      <DrawerContext.Provider value={operations}>
        <RcDrawer
          handler={false}
          {...{
            placement,
            prefixCls,
            maskClosable,
            level,
            keyboard,
            children,
            onClose,
            ...rest,
          }}
          {...offsetStyle}
          open={visible}
          showMask={mask}
          style={getRcDrawerStyle()}
          className={drawerClassName}
        >
          {renderBody()}
        </RcDrawer>
      </DrawerContext.Provider>
    )
  },
)

Drawer.displayName = 'Drawer'

const DrawerWrapper: React.FC<DrawerProps> = React.forwardRef<DrawerRef, DrawerProps>(
  (props, ref) => {
    const { prefixCls: customPrefixCls, getContainer: customGetContainer } = props

    const prefixCls = customPrefixCls ?? 'st-drawer'
    const getContainer = customGetContainer
    return <Drawer {...props} ref={ref} prefixCls={prefixCls} getContainer={getContainer} />
  },
)

DrawerWrapper.displayName = 'DrawerWrapper'

export default DrawerWrapper
