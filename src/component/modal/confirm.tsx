import React from 'react'
import ReactDOM from 'react-dom'
import { getDefaultLocale, ModalFuncProps } from './modal'
import ConfirmDialog from './confirmDialog'
import destroyFns from './destroyFns'
import Icon from '../icon'
import { prefixClsIcon } from '../_util/prefixClsIcon'

let defaultRootPrefixCls = 'st'

function getRootPrefixCls() {
  return defaultRootPrefixCls
}

type ConfigUpdate = ModalFuncProps | ((prevConfig: ModalFuncProps) => ModalFuncProps)

export type ModalFunc = (props: ModalFuncProps) => {
  destroy: () => void
  update: (configUpdate: ConfigUpdate) => void
}

export type ModalStaticFunctions = Record<NonNullable<ModalFuncProps['type']>, ModalFunc>

export default function confirm(config: ModalFuncProps) {
  const container = document.createDocumentFragment()

  let currentConfig = { ...config, close, visible: true } as any

  function destroy(...args: any[]) {
    ReactDOM.unmountComponentAtNode(container)
    const triggerCancel = args.some((param) => param && param.triggerCancel)
    if (config.onCancel && triggerCancel) {
      config.onCancel(...args)
    }
    for (let i = 0; i < destroyFns.length; i++) {
      const fn = destroyFns[i]
      if (fn === close) {
        destroyFns.splice(i, i)
        break
      }
    }
  }

  function render({ okText, cancelText, prefixCls: customPrefixCls, ...props }: any) {
    setTimeout(() => {
      const locale = getDefaultLocale()
      const rootPrefixCls = getRootPrefixCls()
      const prefixCls = customPrefixCls || `${rootPrefixCls}-modal`
      const iconPrefixCls = 'sticon'

      ReactDOM.render(
        <ConfirmDialog
          {...props}
          prefixCls={prefixCls}
          rootPrefixCls={rootPrefixCls}
          iconPrefixCls={iconPrefixCls}
          okText={okText || (props.okCancel ? locale.okText : locale.justOkText)}
          cancelText={cancelText || locale.cancelText}
        />,
        container,
      )
    })
  }

  function close(...args: any[]) {
    currentConfig = {
      ...currentConfig,
      visible: false,
      afterClose: () => {
        if (typeof config.afterClose === 'function') {
          config.afterClose()
        }
        /// destroy.apply(this, args);
        ;(destroy as Function).apply(args)
      },
    }
    render(currentConfig)
  }

  function update(configUpdate: ConfigUpdate) {
    if (typeof configUpdate === 'function') {
      currentConfig = configUpdate(currentConfig)
    } else {
      currentConfig = {
        ...currentConfig,
        ...configUpdate,
      }
    }
    render(currentConfig)
  }

  render(currentConfig)

  destroyFns.push(close)

  return {
    destroy: close,
    update,
  }
}

export function withWarn(props: ModalFuncProps): ModalFuncProps {
  return {
    icon: prefixClsIcon(<Icon icon={'warning'} />),
    okCancel: false,
    ...props,
    type: 'warning',
  }
}

export function withInfo(props: ModalFuncProps): ModalFuncProps {
  return {
    icon: prefixClsIcon(<Icon icon={'info-circle'} />),
    okCancel: false,
    ...props,
    type: 'info',
  }
}

export function withSuccess(props: ModalFuncProps): ModalFuncProps {
  return {
    icon: prefixClsIcon(<Icon icon={'check-circle'} />),
    okCancel: false,
    ...props,
    type: 'success',
  }
}

export function withError(props: ModalFuncProps): ModalFuncProps {
  return {
    icon: prefixClsIcon(<Icon icon={'xmark-circle'} />),
    okCancel: false,
    ...props,
    type: 'error',
  }
}

export function withConfirm(props: ModalFuncProps): ModalFuncProps {
  return {
    icon: prefixClsIcon(<Icon icon={'exclamation-circle'} />),
    okCancel: true,
    ...props,
    type: 'confirm',
  }
}

export function modalGlobalConfig({ rootPrefixCls }: { rootPrefixCls: string }) {
  defaultRootPrefixCls = rootPrefixCls
}
