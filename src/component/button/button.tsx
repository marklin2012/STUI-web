import React, { ButtonHTMLAttributes, useState } from 'react'
import classNames from 'classnames'
import Group from './button-group'
import Wave from '../_util/wave'
import { DirectionType, SizeType, tuple } from '../_util/type'
import { cloneElement } from '../_util/reactNode'
import LoadingIcon from './loadingIcon'
import omit from 'rc-util/lib/omit'

const rxTwoCNChar = /^[\u4e00-\u9fa5]{2}$/
const isTwoCNChar = rxTwoCNChar.test.bind(rxTwoCNChar)
function isString(str: any) {
  return typeof str === 'string'
}

const ButtonTypes = tuple('default', 'primary', 'ghost', 'dashed', 'link', 'text')
export type ButtonType = typeof ButtonTypes[number]
const ButtonShapes = tuple('default', 'circle', 'round')
export type ButtonShape = typeof ButtonShapes[number]
const ButtonHTMLTypes = tuple('submit', 'button', 'reset')
export type ButtonHTMLType = typeof ButtonHTMLTypes[number]
export type LegacyButtonType = ButtonType | 'danger' | 'success'

function isUnborderedButtonType(type: ButtonType | undefined) {
  return type === 'text' || type === 'link'
}

function isReactFragment(node: React.ReactNode) {
  return React.isValidElement(node) && node.type === React.Fragment
}

function insertSpace(child: React.ReactChild, needInserted: boolean, iconSpaceText: boolean) {
  if (child === null) return
  const SPACE = needInserted ? ' ' : ''
  if (
    typeof child !== 'string' &&
    typeof child !== 'number' &&
    isString(child.type) &&
    isTwoCNChar(child.props.children)
  ) {
    return cloneElement(child, {
      children: child.props.children.split('').join(SPACE),
    })
  }
  if (typeof child === 'string') {
    const tempChild = isTwoCNChar(child) ? (
      <span>{child.split('').join(SPACE)}</span>
    ) : (
      <span>{child}</span>
    )
    if (iconSpaceText) {
      const childProps = {
        style: {
          paddingLeft: 10,
        },
      }
      return cloneElement(tempChild, childProps)
    }
    return tempChild
  }
  if (isReactFragment(child)) {
    return <span>{child}</span>
  }
  return child
}

function spaceChildren(children: React.ReactNode, needInserted: boolean, iconSpaceText: boolean) {
  let isPrevChildPure: boolean = false
  const ChildList: React.ReactNode[] = []
  React.Children.forEach(children, (child) => {
    const type = typeof child
    const isCurrentChildPrue = type === 'string' || type === 'number'
    if (isPrevChildPure && isCurrentChildPrue) {
      const lastIndex = ChildList.length - 1
      const lastChild = ChildList[lastIndex]
      ChildList[lastIndex] = `${lastChild}${child}`
    } else {
      ChildList.push(child)
    }

    isPrevChildPure = isCurrentChildPrue
  })

  return React.Children.map(ChildList, (child) =>
    insertSpace(child as React.ReactChild, needInserted, iconSpaceText),
  )
}

export function convertLegacyProps(type?: LegacyButtonType): ButtonProps {
  if (type === 'danger') {
    return { danger: true }
  } else if (type === 'success') {
    return { success: true }
  }
  return { type }
}

export interface BaseButtonProps {
  type?: ButtonType
  icon?: React.ReactNode
  shape?: ButtonShape
  size?: SizeType | number
  loading?: boolean | { delay?: number }
  prefixCls?: string
  className?: string
  ghost?: boolean
  danger?: boolean
  block?: boolean
  success?: boolean
  children?: React.ReactNode
  direction?: DirectionType
  autoInsertSpace?: boolean // 是否添加空格
}

export type AnchorButtonProps = {
  href: string
  target?: string
  onClick?: React.MouseEventHandler<HTMLElement>
} & BaseButtonProps &
  Omit<React.AnchorHTMLAttributes<any>, 'type' | 'onClick'>

export type NativeButtonProps = {
  htmlType?: ButtonHTMLType
  onClick?: React.MouseEventHandler<HTMLElement>
} & BaseButtonProps &
  Omit<ButtonHTMLAttributes<any>, 'type' | 'onClick'>

export type ButtonProps = Partial<AnchorButtonProps & NativeButtonProps>

interface CompoundedComponent
  extends React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLElement>> {
  Group: typeof Group
  BUTTON: boolean
}

type Loading = number | boolean

const InternalButton: React.ForwardRefRenderFunction<unknown, ButtonProps> = (props, ref) => {
  const {
    loading = false,
    prefixCls: customPrefixCls,
    type = 'default',
    danger,
    success,
    shape = 'default',
    size: customSize,
    className,
    children,
    icon,
    ghost = false,
    block = false,
    autoInsertSpace = true,
    htmlType = 'button' as ButtonProps['htmlType'],
    direction,
    ...restProps
  } = props

  const [innerLoading, setLoading] = useState<Loading>(!!loading)
  const [hasTwoCNChar, setHasTwoCNChar] = useState(false)
  const prefixCls = customPrefixCls ?? 'st-btn'
  const size = customSize ?? 'middle'
  const buttonRef = (ref as any) || React.createRef<HTMLElement>()

  const isNeedInserted = () => {
    return React.Children.count(children) === 1 && !icon && !isUnborderedButtonType(type)
  }

  const fixTwoCNChar = () => {
    if (!buttonRef || !buttonRef.current || autoInsertSpace === false) {
      return
    }
    const buttonText = buttonRef.current.textContent
    if (isNeedInserted() && isTwoCNChar(buttonText)) {
      if (!hasTwoCNChar) {
        setHasTwoCNChar(true)
      }
    } else if (hasTwoCNChar) {
      setHasTwoCNChar(false)
    }
  }

  const loadingOrDelay: Loading =
    typeof loading === 'object' && loading.delay ? loading.delay || true : !!loading

  React.useEffect(() => {
    let delayTimer: number | null = null
    if (typeof loadingOrDelay === 'number') {
      delayTimer = window.setTimeout(() => {
        delayTimer = null
        setLoading(loadingOrDelay)
      }, loadingOrDelay)
    } else {
      setLoading(loadingOrDelay)
    }

    return () => {
      if (delayTimer) {
        window.clearTimeout(delayTimer)
        delayTimer = null
      }
    }
  }, [loadingOrDelay])

  React.useEffect(fixTwoCNChar, [buttonRef])

  const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    const { onClick, disabled } = props
    if (innerLoading || disabled) {
      e.preventDefault()
      return
    }
    ;(onClick as React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>)?.(e)
  }

  const iconType = innerLoading ? 'loading' : icon

  const classNameStr = classNames(
    prefixCls,
    {
      [`${prefixCls}-${shape}`]: shape !== 'default' && shape,
      [`${prefixCls}-${type}`]: type,
      [`${prefixCls}-lg`]: size === 'large',
      [`${prefixCls}-sm`]: size === 'small',
      [`${prefixCls}-icon-only`]: !children && children !== 0 && !!iconType,
      [`${prefixCls}-background-ghost`]: ghost && !isUnborderedButtonType(type),
      [`${prefixCls}-loading`]: innerLoading,
      [`${prefixCls}-two-chinese-chars`]: hasTwoCNChar && autoInsertSpace,
      [`${prefixCls}-block`]: block,
      [`${prefixCls}-dangerous`]: !!danger,
      [`${prefixCls}-success`]: !!success,
      [`${prefixCls}-rtl`]: direction === 'rtl',
    },
    className,
  )

  const hasIcon = !!icon || !!loading
  const iconNode =
    icon && !innerLoading ? (
      icon
    ) : (
      <LoadingIcon existIcon={!!icon} prefixCls={prefixCls} loading={!!innerLoading} />
    )

  let kids =
    children || children === 0
      ? spaceChildren(children, isNeedInserted() && autoInsertSpace, hasIcon)
      : null

  const linkButtonRestProps = omit(restProps as AnchorButtonProps & { navigate: any }, ['navigate'])
  if (linkButtonRestProps.href !== undefined) {
    return (
      <a {...linkButtonRestProps} className={classNameStr} onClick={handleClick} ref={buttonRef}>
        {iconNode}
        {kids}
      </a>
    )
  }

  const buttonNode = (
    <button
      {...(restProps as NativeButtonProps)}
      type={htmlType}
      className={classNameStr}
      onClick={handleClick}
      ref={buttonRef}
    >
      {iconNode}
      {kids}
    </button>
  )

  if (isUnborderedButtonType(type)) {
    return buttonNode
  }

  return <Wave disabled={!!innerLoading}>{buttonNode}</Wave>
}

const Button = React.forwardRef<unknown, ButtonProps>(InternalButton) as CompoundedComponent

Button.displayName = 'Button'

Button.Group = Group
Button.BUTTON = true

export default Button
