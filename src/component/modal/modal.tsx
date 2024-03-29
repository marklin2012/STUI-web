import React, { SyntheticEvent } from 'react'
import Dialog from 'rc-dialog'
import classNames from 'classnames'
import Button from '../button'
import { LegacyButtonType, ButtonProps, convertLegacyProps } from '../button/button'
import Icon from '../icon'
import { canUseDocElement } from '../_util/styleChecker'
import { getTransitionName } from '../_util/motion'
import { prefixClsIcon } from '../_util/prefixClsIcon'

let mousePosition: { x: number; y: number } | null

const getClickPosition = (e: MouseEvent) => {
  mousePosition = {
    x: e.pageX,
    y: e.pageY,
  }
  // 100ms 内发生过点击事件，则从点击位置动画展示
  // 否则直接 zoom 展示
  // 这样可以兼容非点击方式展开
  setTimeout(() => {
    mousePosition = null
  }, 100)
}

// 只有点击事件支持从鼠标位置动画展开
if (canUseDocElement()) {
  document.documentElement.addEventListener('click', getClickPosition, true)
}

export interface ModalProps {
  /** 对话框是否可见 */
  visible?: boolean
  /** 确定按钮 loading */
  confirmLoading?: boolean
  /** 标题 */
  title?: React.ReactNode
  /** 是否显示右上角的关闭按钮 */
  closable?: boolean
  /** 点击确定回调 */
  onOk?: (e: React.MouseEvent<HTMLElement>) => void
  /** 点击模态框右上角叉、取消按钮、Props.maskClosable 值为 true 时的遮罩层或键盘按下 Esc 时的回调 */
  onCancel?: (e: React.MouseEvent<HTMLElement>) => void
  afterClose?: () => void
  /** 垂直居中 */
  centered?: boolean
  /** 宽度 */
  width?: string | number
  /** 底部内容 */
  footer?: React.ReactNode
  /** 确认按钮文字 */
  okText?: React.ReactNode
  /** 确认按钮类型 */
  okType?: LegacyButtonType
  /** 取消按钮文字 */
  cancelText?: React.ReactNode
  /** 点击蒙层是否允许关闭 */
  maskClosable?: boolean
  /** 强制渲染 Modal */
  forceRender?: boolean
  okButtonProps?: ButtonProps
  cancelButtonProps?: ButtonProps
  destroyOnClose?: boolean
  style?: React.CSSProperties
  wrapClassName?: string
  maskTransitionName?: string
  transitionName?: string
  className?: string
  getContainer?: string | HTMLElement | getContainerFunc | false
  zIndex?: number
  bodyStyle?: React.CSSProperties
  maskStyle?: React.CSSProperties
  mask?: boolean
  keyboard?: boolean
  wrapProps?: any
  prefixCls?: string
  closeIcon?: React.ReactNode
  modalRender?: (node: React.ReactNode) => React.ReactNode
  focusTriggerAfterClose?: boolean
  isScrolled?: boolean
}

type getContainerFunc = () => HTMLElement

export interface ModalFuncProps {
  prefixCls?: string
  className?: string
  visible?: boolean
  title?: React.ReactNode
  closable?: boolean
  content?: React.ReactNode
  // TODO: find out exact types
  onOk?: (...args: any[]) => any
  onCancel?: (...args: any[]) => any
  afterClose?: () => void
  okButtonProps?: ButtonProps
  cancelButtonProps?: ButtonProps
  centered?: boolean
  width?: string | number
  okText?: React.ReactNode
  okType?: LegacyButtonType
  cancelText?: React.ReactNode
  icon?: React.ReactNode
  mask?: boolean
  maskClosable?: boolean
  zIndex?: number
  okCancel?: boolean
  style?: React.CSSProperties
  wrapClassName?: string
  maskStyle?: React.CSSProperties
  type?: 'info' | 'success' | 'error' | 'warn' | 'warning' | 'confirm'
  keyboard?: boolean
  getContainer?: string | HTMLElement | getContainerFunc | false
  autoFocusButton?: null | 'ok' | 'cancel'
  transitionName?: string
  maskTransitionName?: string
  bodyStyle?: React.CSSProperties
  closeIcon?: React.ReactNode
  modalRender?: (node: React.ReactNode) => React.ReactNode
  focusTriggerAfterClose?: boolean
}

export interface ModalLocale {
  okText: string
  cancelText: string
  justOkText: string
}

export function getDefaultLocale() {
  const defaultModalLocale: ModalLocale = {
    okText: '确定',
    cancelText: '取消',
    justOkText: '知道了',
  }
  return defaultModalLocale
}

const Modal: React.FC<ModalProps> = (props) => {
  const handleCancel = (e: SyntheticEvent<Element, Event>) => {
    const { onCancel } = props
    onCancel?.(e as React.MouseEvent<HTMLButtonElement>)
  }

  const handleOk = (e: SyntheticEvent<Element, Event>) => {
    const { onOk } = props
    onOk?.(e as React.MouseEvent<HTMLButtonElement>)
  }

  const renderFooter = (locale: ModalLocale) => {
    if (footer === null) return
    const { okText, okType, cancelText, confirmLoading } = props
    return (
      <>
        <Button onClick={handleCancel} {...props.cancelButtonProps}>
          {cancelText || locale.cancelText}
        </Button>
        <Button
          {...convertLegacyProps(okType)}
          loading={confirmLoading}
          onClick={handleOk}
          {...props.okButtonProps}
        >
          {okText || locale.okText}
        </Button>
      </>
    )
  }

  const {
    prefixCls: customPrefixCls,
    footer,
    visible,
    wrapClassName,
    centered,
    getContainer,
    closeIcon,
    focusTriggerAfterClose = true,
    isScrolled,
    ...restProps
  } = props

  const prefixCls = customPrefixCls ?? 'st-modal'
  const rootPrefixCls = 'st'

  const defaultFooter = renderFooter(getDefaultLocale())

  const renderCloseIcon = (
    <span className={`${prefixCls}-close-x`}>
      {closeIcon || prefixClsIcon(<Icon icon={'xmark'} />, `${prefixCls}-close-icon`)}
    </span>
  )

  const wrapClassNameExtended = classNames(wrapClassName, {
    [`${prefixCls}-centered`]: !!centered,
    [`${prefixCls}-isScrolled`]: isScrolled === true,
  })

  return (
    <Dialog
      {...restProps}
      getContainer={getContainer}
      prefixCls={prefixCls}
      wrapClassName={wrapClassNameExtended}
      footer={footer === undefined ? defaultFooter : footer}
      visible={visible}
      mousePosition={mousePosition}
      onClose={handleCancel}
      closeIcon={renderCloseIcon}
      focusTriggerAfterClose={focusTriggerAfterClose}
      transitionName={getTransitionName(rootPrefixCls, 'zoom', props.transitionName)}
      maskTransitionName={getTransitionName(rootPrefixCls, 'fade', props.maskTransitionName)}
    />
  )
}

Modal.defaultProps = {
  width: 520,
  confirmLoading: false,
  visible: false,
  okType: 'primary' as LegacyButtonType,
}

export default Modal
