import React from 'react'
import classNames from 'classnames'
import useMergedState from 'rc-util/lib/hooks/useMergedState'
import KeyCode from 'rc-util/lib/KeyCode'
import Tooltip, { AbstractTooltipProps } from '../tooltip'
import Icon from '../icon'
import Button from '../button'
import { LegacyButtonType, ButtonProps, convertLegacyProps } from '../button/button'
import { getRenderPropValue, RenderFunction } from '../_util/getRenderPropValue'
import { cloneElement } from '../_util/reactNode'
import { getTransitionName } from '../_util/motion'
import ActionButton from '../_util/actionButton'
import useDestroyed from '../_util/hooks/useDestroyed'
import { prefixClsIcon } from '../_util/prefixClsIcon'

export interface PopconfirmProps extends AbstractTooltipProps {
  title: React.ReactNode | RenderFunction
  disable?: boolean
  onConfirm?: (e?: React.MouseEvent<HTMLElement>) => void
  onCancel?: (e?: React.MouseEvent<HTMLElement>) => void
  okText?: React.ReactNode
  okType?: LegacyButtonType
  cancelText?: React.ReactNode
  okButtonProps?: ButtonProps
  cancelButtonProps?: ButtonProps
  showCancel?: boolean
  icon?: React.ReactNode
  onVisibleChange?: (
    visible: boolean,
    e?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLDivElement>,
  ) => void
}

export interface PopconfirmState {
  visible?: boolean
}

export interface PopconfirmLocale {
  okText: string
  cancelText: string
}

const defaultPopconfirmLocale: PopconfirmLocale = {
  okText: '确认',
  cancelText: '取消',
}

const Popcomfirm = React.forwardRef<unknown, PopconfirmProps>((props, ref) => {
  const [visible, setVisible] = useMergedState(false, {
    value: props.visible,
    defaultValue: props.defaultVisible,
  })

  const isDestroyed = useDestroyed()

  const settingVisible = (
    value: boolean,
    e?: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLDivElement>,
  ) => {
    if (!isDestroyed()) {
      setVisible(value)
    }
    props.onVisibleChange?.(false, e)
  }

  const close = (e: React.MouseEvent<HTMLButtonElement>) => {
    settingVisible(false, e)
  }

  const onConfirm = (e: React.MouseEvent<HTMLButtonElement>) => props.onConfirm?.call(this, e)

  const onCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    settingVisible(false, e)
    props.onCancel?.call(this, e)
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.keyCode === KeyCode.ESC && visible) {
      settingVisible(false, e)
    }
  }

  const onVisibleChange = (value: boolean) => {
    const { disable } = props
    if (disable) {
      return
    }
    settingVisible(value)
  }

  const renderOverlay = (prefixCls: string, popconfirmLocale: PopconfirmLocale) => {
    const {
      okButtonProps,
      cancelButtonProps,
      title,
      cancelText,
      okText,
      okType,
      icon,
      showCancel = true,
    } = props
    return (
      <div className={`${prefixCls}-inner-content`}>
        <div className={`${prefixCls}-message`}>
          {icon}
          <div className={`${prefixCls}-message-title`}>{getRenderPropValue(title)}</div>
        </div>
        <div className={`${prefixCls}-buttons`}>
          {showCancel && (
            <Button onClick={onCancel} size="small" {...cancelButtonProps}>
              {cancelText || popconfirmLocale.cancelText}
            </Button>
          )}
          <ActionButton
            buttonProps={{
              size: 'small',
              ...convertLegacyProps(okType),
              ...okButtonProps,
            }}
            actionFn={onConfirm}
            close={close}
            prefixCls={'st-btn'}
            quitOnNullishReturnValue
            emitEvent
          >
            {okText || popconfirmLocale.okText}
          </ActionButton>
        </div>
      </div>
    )
  }

  const { prefixCls: customPrefixCls, placement, children, overlayClassName, ...restProps } = props
  const rootPrefixCls = 'st'
  const prefixCls = customPrefixCls ?? 'st-popover'
  const prefixClsConfirm = customPrefixCls ?? 'st-popconfirm'
  const overlayClassNameStr = classNames(prefixClsConfirm, overlayClassName)
  const overlay = renderOverlay(prefixCls, defaultPopconfirmLocale)

  return (
    <Tooltip
      {...restProps}
      prefixCls={prefixCls}
      placement={placement}
      onVisibleChange={onVisibleChange}
      visible={visible}
      overlay={overlay}
      overlayClassName={overlayClassNameStr}
      ref={ref as any}
      transitionName={getTransitionName(rootPrefixCls, 'zoom-big', props.transitionName)}
    >
      {cloneElement(children, {
        onKeyDown: (e: React.KeyboardEvent<any>) => {
          if (React.isValidElement(children)) {
            children?.props.onKeyDown?.(e)
          }
          onKeyDown(e)
        },
      })}
    </Tooltip>
  )
})

Popcomfirm.defaultProps = {
  placement: 'top' as PopconfirmProps['placement'],
  trigger: 'click' as PopconfirmProps['trigger'],
  okType: 'primary' as PopconfirmProps['okType'],
  icon: prefixClsIcon(<Icon icon={'info-circle'} />, 'sticon'),
  disable: false,
}

export default Popcomfirm
