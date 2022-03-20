import React from 'react'
import classNames from 'classnames'
import Button, { ButtonProps } from '../button'
import { ButtonHTMLType } from '../button/button'
import { ButtonGroupProps } from '../button'
import Dropdown, { DropdownProps } from './dropdown'
import Icon from '../icon'

const ButtonGroup = Button.Group

export type DropdownButtonType = 'default' | 'primary' | 'ghost' | 'dashed' | 'link' | 'text'

export interface DropdownButtonProps extends ButtonGroupProps, DropdownProps {
  type?: DropdownButtonType
  htmlType?: ButtonHTMLType
  disabled?: boolean
  loading?: ButtonProps['loading']
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  icon?: React.ReactNode
  href?: string
  children?: React.ReactNode
  title?: string
  buttonsRender?: (buttons: React.ReactNode[]) => React.ReactNode[]
}

interface DropdownButtonInterface extends React.FC<DropdownButtonProps> {
  BUTTON: boolean
}

const DropdownButton: DropdownButtonInterface = (props) => {
  const {
    prefixCls: customPrefixCls,
    type = 'default',
    disabled,
    loading,
    onClick,
    htmlType,
    children,
    className,
    overlay,
    trigger,
    align,
    visible,
    onVisibleChange,
    placement,
    getPopupContainer,
    href,
    icon = <Icon icon={'angle-down'} />,
    title,
    buttonsRender = (buttons: React.ReactNode[]) => buttons,
    mouseEnterDelay,
    mouseLeaveDelay,
    overlayClassName,
    overlayStyle,
    destroyPopupOnHide,
    direction,
    ...restProps
  } = props

  const prefixCls = customPrefixCls ?? 'st-dropdown-button'
  const dropdownProps = {
    align,
    overlay,
    disabled,
    trigger: disabled ? [] : trigger,
    onVisibleChange,
    getPopupContainer: getPopupContainer,
    mouseEnterDelay,
    mouseLeaveDelay,
    overlayClassName,
    overlayStyle,
    destroyPopupOnHide,
  } as DropdownProps

  if ('visible' in props) {
    dropdownProps.visible = visible
  }

  if ('placement' in props) {
    dropdownProps.placement = placement
  } else {
    dropdownProps.placement = direction === 'rtl' ? 'bottomLeft' : 'bottomRight'
  }

  const leftButton = (
    <Button
      type={type}
      disabled={disabled}
      loading={loading}
      onClick={onClick}
      htmlType={htmlType}
      href={href}
      title={title}
    >
      {children}
    </Button>
  )

  const rightButton = <Button type={type} icon={icon} />

  const [leftButonRender, rightButtonRender] = buttonsRender!([leftButton, rightButton])

  return (
    <ButtonGroup {...restProps} className={classNames(prefixCls, className)}>
      {leftButonRender}
      <Dropdown {...dropdownProps}>{rightButtonRender}</Dropdown>
    </ButtonGroup>
  )
}

DropdownButton.BUTTON = true

export default DropdownButton
