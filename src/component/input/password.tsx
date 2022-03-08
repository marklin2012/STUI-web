import classNames from 'classnames'
import omit from 'rc-util/lib/omit'
import React from 'react'
import Icon from '../icon'
import Input, { InputPrefixCls, InputProps } from './input'
import './style'

export interface PasswordProps extends InputProps {
  readonly inputPrefixCls?: string
  readonly action?: string
  visibilityToggle?: boolean
  iconRender?: (visible: boolean) => React.ReactNode
}

const ActionMap: Record<string, string> = {
  click: 'onClick',
  hover: 'onMouseOver',
}

const Password = React.forwardRef<any, PasswordProps>((props, ref) => {
  const [visible, setVisible] = React.useState(false)

  const onVisibleChange = () => {
    const { disabled } = props
    if (disabled) return

    setVisible(!visible)
  }

  const getIcon = (prefixCls: string) => {
    const { action, iconRender = () => null } = props
    const iconTrigger = ActionMap[action!] || ''
    const icon = iconRender(visible)
    const iconProps = {
      [iconTrigger]: onVisibleChange,
      className: `${prefixCls}-icon`,
      key: 'passwordIcon',
      onMouseDown: (e: MouseEvent) => {
        // 防止焦点丢失
        e.preventDefault()
      },
      onMouseUp: (e: MouseEvent) => {
        // 防止插入符号位置改变
        e.preventDefault()
      },
    }
    return React.cloneElement(React.isValidElement(icon) ? icon : <span>{icon}</span>, iconProps)
  }

  const renderPassword = () => {
    const {
      className,
      prefixCls: customPrefixCls,
      inputPrefixCls: customInputPrefixCls,
      size,
      visibilityToggle,
      ...restProps
    } = props

    const inputPrefixCls = customInputPrefixCls ?? InputPrefixCls
    const prefixCls = customPrefixCls ?? 'st-input-password'

    const suffixIcon = visibilityToggle && getIcon(prefixCls)
    const inputClassName = classNames(prefixCls, className, {
      [`${prefixCls}-${size}`]: !!size,
    })

    const ommittedProps = {
      ...omit(restProps, ['suffix', 'iconRender']),
      type: visible ? 'text' : 'password',
      className: inputClassName,
      prefixCls: inputPrefixCls,
      suffix: suffixIcon,
    } as InputProps

    if (size) {
      ommittedProps.size = size
    }

    return <Input ref={ref} {...ommittedProps} />
  }

  return renderPassword()
})

Password.defaultProps = {
  action: 'click',
  visibilityToggle: true,
  iconRender: (visible: boolean) => (visible ? <Icon icon={'eye'} /> : <Icon icon={'eye-slash'} />),
}

Password.displayName = 'Password'

export default Password
