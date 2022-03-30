import React from 'react'
import { getDefaultLocale, ModalFuncProps } from '../modal'
import ConfirmDialog from '../confirmDialog'

export interface HookModalProps {
  afterClose: () => void
  config: ModalFuncProps
}

export interface HookModalRef {
  destroy: () => void
  update: (config: ModalFuncProps) => void
}

const HookModal: React.ForwardRefRenderFunction<HookModalRef, HookModalProps> = (
  { afterClose, config },
  ref,
) => {
  const [visible, setVisible] = React.useState(true)
  const [innerConfig, setInnerConfig] = React.useState(config)

  const rootPrefixCls = 'st'
  const prefixCls = `${rootPrefixCls}-modal`

  const close = (...args: any[]) => {
    setVisible(false)
    const triggerCancel = args.some((param) => param && param.triggerCancel)
    if (innerConfig.onCancel && triggerCancel) {
      innerConfig.onCancel()
    }
  }

  React.useImperativeHandle(ref, () => ({
    destroy: close,
    update: (newConfig: ModalFuncProps) => {
      setInnerConfig((originConfig) => ({
        ...originConfig,
        ...newConfig,
      }))
    },
  }))

  const locale = getDefaultLocale()
  return (
    <ConfirmDialog
      prefixCls={prefixCls}
      rootPrefixCls={rootPrefixCls}
      {...innerConfig}
      close={close}
      visible={visible}
      afterClose={afterClose}
      okText={innerConfig.okText || (innerConfig.okCancel ? locale.okText : locale.justOkText)}
      cancelText={innerConfig.cancelText || locale.cancelText}
    />
  )
}

export default React.forwardRef(HookModal)
