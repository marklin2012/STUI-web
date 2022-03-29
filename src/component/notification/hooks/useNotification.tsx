import React from 'react'
import useRCNotification from 'rc-notification/lib/useNotification'
import {
  NotificationInstance as RCNotificationInstance,
  NoticeContent as RCNoticeContent,
  HolderReadyCallback as RCHolderReadyCallback,
} from 'rc-notification/lib/Notification'
import { NotificationInstance, ArgsProps } from '..'

export default function createUseNotification(
  getNotificationInstance: (
    args: ArgsProps,
    callback: (info: { prefixCls: string; instance: RCNotificationInstance }) => void,
  ) => void,
  getRCNoticeProps: (args: ArgsProps, prefixCls: string) => RCNoticeContent,
) {
  const useNotification = (): [NotificationInstance, React.ReactElement] => {
    let innerInstance: RCNotificationInstance | null = null
    const proxy = {
      add: (noticeProps: RCNoticeContent, holderCallback?: RCHolderReadyCallback) => {
        innerInstance?.component.add(noticeProps, holderCallback)
      },
    } as any

    const [hookNotify, holder] = useRCNotification(proxy)

    function notify(args: ArgsProps) {
      const { prefixCls: customizePrefixCls } = args
      const mergedPrefixCls = customizePrefixCls ?? 'st-notification'

      getNotificationInstance(
        {
          ...args,
          prefixCls: mergedPrefixCls,
        },
        ({ prefixCls, instance }) => {
          innerInstance = instance
          hookNotify(getRCNoticeProps(args, prefixCls))
        },
      )
    }

    const hookApiRef = React.useRef<any>()

    hookApiRef.current.open = notify

    ;['success', 'info', 'warning', 'error'].forEach((type) => {
      hookApiRef.current[type] = (args: ArgsProps) =>
        hookApiRef.current.open({
          ...args,
          type,
        })
    })

    return [hookApiRef.current, holder]
  }

  return useNotification
}
