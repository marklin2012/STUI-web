import React from 'react'
import Notification from 'rc-notification'
import { NotificationInstance as RCNotificationInstance } from 'rc-notification/lib/Notification'
import classNames from 'classnames'
import createUseNotification from './hooks/useNotification'
import Icon from '../icon'
import { prefixClsIcon } from '../_util/prefixClsIcon'

export type NotificationPlacement = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'

export type IconType = 'success' | 'info' | 'error' | 'warning'

const notificationInstance: {
  [key: string]: Promise<RCNotificationInstance>
} = {}
let defaultDuration = 4.5
let defaultTop = 24
let defaultBottom = 24
let defaultPrefixCls = 'st-notification'
let defaultIconPrefixCls = 'sticon'
let defaultPlacement: NotificationPlacement = 'topRight'
let defaultGetContainer: () => HTMLElement
let defaultCloseIcon: React.ReactNode
let rtl = false
let maxCount: number

export interface ConfigProps {
  top?: number
  bottom?: number
  duration?: number
  prefixCls?: string
  placement?: NotificationPlacement
  getContainer?: () => HTMLElement
  closeIcon?: React.ReactNode
  rtl?: boolean
  maxCount?: number
}

function setNotificationConfig(options: ConfigProps) {
  const { duration, placement, bottom, top, getContainer, closeIcon, prefixCls } = options
  if (prefixCls !== undefined) {
    defaultPrefixCls = prefixCls
  }
  if (duration !== undefined) {
    defaultDuration = duration
  }
  if (placement !== undefined) {
    defaultPlacement = placement
  } else if (options.rtl) {
    defaultPlacement = 'topLeft'
  }
  if (bottom !== undefined) {
    defaultBottom = bottom
  }
  if (top !== undefined) {
    defaultTop = top
  }
  if (getContainer !== undefined) {
    defaultGetContainer = getContainer
  }
  if (closeIcon !== undefined) {
    defaultCloseIcon = closeIcon
  }
  if (options.rtl !== undefined) {
    rtl = options.rtl
  }
  if (options.maxCount !== undefined) {
    maxCount = options.maxCount
  }
}

function getPlacementStyle(
  placement: NotificationPlacement,
  top: number = defaultTop,
  bottom: number = defaultBottom,
) {
  let style
  switch (placement) {
    case 'topLeft':
      style = {
        left: 0,
        top,
        bottom: 'auto',
      }
      break
    case 'topRight':
      style = {
        right: 0,
        top,
        bottom: 'auto',
      }
      break
    case 'bottomLeft':
      style = {
        left: 0,
        top: 'auto',
        bottom,
      }
      break
    default:
      style = {
        right: 0,
        top: 'auto',
        bottom,
      }
      break
  }
  return style
}

function getNotificationInstance(
  args: ArgsProps,
  callback: (info: {
    prefixCls: string
    iconPrefixCls: string
    instance: RCNotificationInstance
  }) => void,
) {
  const {
    placement = defaultPlacement,
    top,
    bottom,
    getContainer = defaultGetContainer,
    prefixCls: customizePrefixCls,
  } = args
  const prefixCls = customizePrefixCls || defaultPrefixCls
  const iconPrefixCls = defaultIconPrefixCls

  const cacheKey = `${prefixCls}-${placement}`
  const cacheInstance = notificationInstance[cacheKey]
  if (cacheInstance) {
    Promise.resolve(cacheInstance).then((instance) => {
      callback({ prefixCls: `${prefixCls}-notice`, iconPrefixCls, instance })
    })
    return
  }

  const notificationClass = classNames(`${prefixCls}-${placement}`, {
    [`${prefixCls}-rtl`]: rtl === true,
  })

  notificationInstance[cacheKey] = new Promise((resolve) => {
    Notification.newInstance(
      {
        prefixCls,
        className: notificationClass,
        style: getPlacementStyle(placement, top, bottom),
        getContainer,
        maxCount,
      },
      (notification) => {
        resolve(notification)
        callback({
          prefixCls: `${prefixCls}-notice`,
          iconPrefixCls,
          instance: notification,
        })
      },
    )
  })
}

const typeToIcon = {
  success: <Icon icon={'check-circle'} />,
  info: <Icon icon={'info-circle'} />,
  error: <Icon icon={'xmark-circle'} />,
  warning: <Icon icon={'warning'} />,
}

export interface ArgsProps {
  message: React.ReactNode
  description?: React.ReactNode
  btn?: React.ReactNode
  key?: string
  onClose?: () => void
  duration?: number | null
  icon?: React.ReactNode
  placement?: NotificationPlacement
  style?: React.CSSProperties
  prefixCls?: string
  className?: string
  readonly type?: IconType
  onClick?: () => void
  top?: number
  bottom?: number
  getContainer?: () => HTMLElement
  closeIcon?: React.ReactNode
  closable?: boolean
}

function getRCNoticeProps(args: ArgsProps, prefixCls: string, iconPrefixCls?: string) {
  const {
    duration: durationArg,
    icon,
    type,
    description,
    message,
    btn,
    onClose,
    onClick,
    key,
    style,
    className,
    closeIcon = defaultCloseIcon,
    closable,
  } = args

  const duration = durationArg === undefined ? defaultDuration : durationArg

  let iconNode: React.ReactNode = null
  if (icon) {
    iconNode = <span className={`${prefixCls}-icon`}>{args.icon}</span>
  } else if (type) {
    iconNode = prefixClsIcon(
      typeToIcon[type] || null,
      `${prefixCls}-icon ${prefixCls}-icon-${type}`,
    )
  }

  const closeIconToRender = (
    <span className={`${prefixCls}-close-x`}>
      {closeIcon || prefixClsIcon(<Icon icon={'xmark'} />, `${prefixCls}-close-icon`)}
    </span>
  )

  const autoMarginTag =
    !description && iconNode ? (
      <span className={`${prefixCls}-message-single-line-auto-margin`} />
    ) : null

  return {
    content: (
      <div className={iconNode ? `${prefixCls}-with-icon` : ''} role="alert">
        {iconNode}
        <div className={`${prefixCls}-message`}>
          {autoMarginTag}
          {message}
        </div>
        <div className={`${prefixCls}-description`}>{description}</div>
        {btn ? <span className={`${prefixCls}-btn`}>{btn}</span> : null}
      </div>
    ),
    duration,
    closable: closable ?? true,
    closeIcon: closeIconToRender,
    onClose,
    onClick,
    key,
    style: style || {},
    className: classNames(className, {
      [`${prefixCls}-${type}`]: !!type,
    }),
  }
}

function notice(args: ArgsProps) {
  getNotificationInstance(args, ({ prefixCls, iconPrefixCls, instance }) => {
    instance.notice(getRCNoticeProps(args, prefixCls, iconPrefixCls))
  })
}

const api: any = {
  open: notice,
  close(key: string) {
    Object.keys(notificationInstance).forEach((cacheKey) =>
      Promise.resolve(notificationInstance[cacheKey]).then((instance) => {
        instance.removeNotice(key)
      }),
    )
  },
  config: setNotificationConfig,
  destroy() {
    Object.keys(notificationInstance).forEach((cacheKey) => {
      Promise.resolve(notificationInstance[cacheKey]).then((instance) => {
        instance.destroy()
      })
      delete notificationInstance[cacheKey]
    })
  },
}

;['success', 'info', 'warning', 'error'].forEach((type) => {
  api[type] = (args: ArgsProps) =>
    api.open({
      ...args,
      type,
    })
})

api.warn = api.warning
api.useNotification = createUseNotification(getNotificationInstance, getRCNoticeProps)

export interface NotificationInstance {
  success(args: ArgsProps): void
  error(args: ArgsProps): void
  info(args: ArgsProps): void
  warning(args: ArgsProps): void
  open(args: ArgsProps): void
}

export interface NotificationApi extends NotificationInstance {
  warn(args: ArgsProps): void
  close(key: string): void
  config(options: ConfigProps): void
  destroy(): void
  // Hooks
  useNotification: () => [NotificationInstance, React.ReactElement]
}

export default api as NotificationApi
