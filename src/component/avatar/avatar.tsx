import classNames from 'classnames'
import * as React from 'react'
import ResizeObserver from 'rc-resize-observer'
import { composeRef } from 'rc-util/lib/ref'
import SizeContext, { AvatarSize } from './sizeContext'
import userBreakpoint from '../_util/hooks/useBreakpoint'
import { Breakpoint, responsiveArray } from '../_util/responsiveObserver'

const prefixCls = 'st-avatar'

export interface AvatarProps {
  shape?: 'circle' | 'square'
  size?: AvatarSize
  gap?: number
  src?: React.ReactNode
  srcSet?: string
  icon?: React.ReactNode
  style?: React.CSSProperties
  className?: string
  children?: React.ReactNode
  alt?: string // 图像无法显示时的代替字符
  crossOrigin?: '' | 'anonymous' | 'use-credentials'
  onError?: () => boolean
}

const InternalAvatar: React.ForwardRefRenderFunction<unknown, AvatarProps> = (props, ref) => {
  const groupSize = React.useContext(SizeContext)

  const [scale, setScale] = React.useState(1)
  const [mounted, setMounted] = React.useState(false)
  const [isImgExist, setIsImgExist] = React.useState(true)

  const avatarNodeRef = React.useRef<HTMLElement>()
  const avatarChildrenRef = React.useRef<HTMLElement>()
  const avatarNodeMergeRef = composeRef(ref, avatarNodeRef)

  const setScaleParam = () => {
    if (!avatarChildrenRef.current || !avatarNodeRef.current) {
      return
    }
    const childrenWidth = avatarChildrenRef.current.offsetWidth
    const nodeWidth = avatarNodeRef.current.offsetWidth
    if (childrenWidth !== 0 && nodeWidth !== 0) {
      const { gap = 4 } = props
      if (gap * 2 < nodeWidth) {
        setScale(nodeWidth - gap * 2 < childrenWidth ? (nodeWidth - gap * 2) / childrenWidth : 1)
      }
    }
  }

  React.useEffect(() => {
    setMounted(true)
  }, [])

  React.useEffect(() => {
    setIsImgExist(true)
    setScale(1)
  }, [props.src])

  React.useEffect(() => {
    setScaleParam()
  }, [props.gap])

  const handleImgLoadError = () => {
    const { onError } = props
    const errorFlag = onError ? onError() : undefined
    if (errorFlag !== false) {
      setIsImgExist(false)
    }
  }

  const {
    shape,
    size: customSize,
    src,
    srcSet,
    icon,
    className,
    alt,
    children,
    crossOrigin,
    ...rest
  } = props

  const size = customSize === 'default' ? groupSize : customSize

  const needResponsive = Object.keys(typeof size === 'object' ? size || {} : {}).some((key) =>
    ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].includes(key),
  )

  const screens = userBreakpoint(needResponsive)
  const responsiveSizeStyle: React.CSSProperties = React.useMemo(() => {
    if (typeof size !== 'object') {
      return {}
    }

    const currentBreakpoint: Breakpoint = responsiveArray.find((screen) => screens[screen])!
    const currentSize = size[currentBreakpoint]

    return currentSize
      ? {
          width: currentSize,
          height: currentSize,
          lineHeight: `${currentSize}px`,
          fontSize: icon ? currentSize / 2 : 18,
        }
      : {}
  }, [screens, size])

  const sizeCls = classNames({
    [`${prefixCls}-lg`]: size === 'large',
    [`${prefixCls}-sm`]: size === 'small',
  })

  const hasImageElement = React.isValidElement(src)

  const classString = classNames(
    prefixCls,
    sizeCls,
    {
      [`${prefixCls}-${shape}`]: !!shape,
      [`${prefixCls}-image`]: hasImageElement || (src && isImgExist),
      [`${prefixCls}-icon`]: !!icon,
    },
    className,
  )

  const sizeStyle: React.CSSProperties =
    typeof size === 'number'
      ? {
          width: size,
          height: size,
          lineHeight: `${size}px`,
          fontSize: icon ? (size * 5) / 6 : 18,
        }
      : {}

  let childrenToRender
  if (typeof src === 'string' && isImgExist) {
    childrenToRender = (
      <img
        src={src}
        srcSet={srcSet}
        onError={handleImgLoadError}
        alt={alt}
        crossOrigin={crossOrigin}
      />
    )
  } else if (hasImageElement) {
    childrenToRender = src
  } else if (icon) {
    childrenToRender = icon
  } else if (mounted || scale !== 1) {
    const transformString = `scale(${scale}) translateX(-50%)`
    const childrenStyle: React.CSSProperties = {
      msTransform: transformString,
      WebkitTransform: transformString,
      transform: transformString,
    }

    const sizeChildrenStyle: React.CSSProperties =
      typeof size === 'number'
        ? {
            lineHeight: `${size}px`,
          }
        : {}

    childrenToRender = (
      <ResizeObserver onResize={setScaleParam}>
        <span
          className={`${prefixCls}-string`}
          ref={(node: HTMLElement) => {
            avatarChildrenRef.current = node
          }}
          style={{ ...sizeChildrenStyle, ...childrenStyle }}
        >
          {children}
        </span>
      </ResizeObserver>
    )
  } else {
    childrenToRender = (
      <span
        className={`${prefixCls}-string`}
        style={{ opacity: 0 }}
        ref={(node: HTMLElement) => {
          avatarChildrenRef.current = node
        }}
      >
        {children}
      </span>
    )
  }

  delete rest.onError
  delete rest.gap

  return (
    <span
      {...rest}
      style={{ ...sizeStyle, ...responsiveSizeStyle, ...rest.style }}
      className={classString}
      ref={avatarNodeMergeRef as any}
    >
      {childrenToRender}
    </span>
  )
}

const Avatar = React.forwardRef<unknown, AvatarProps>(InternalAvatar)
Avatar.displayName = 'Avatar'

Avatar.defaultProps = {
  shape: 'circle' as AvatarProps['shape'],
  size: 'default' as AvatarProps['size'],
}

export default Avatar
