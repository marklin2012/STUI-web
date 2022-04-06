import React from 'react'

export function prefixClsIcon(children: React.ReactNode, prefixCls?: string) {
  let iconPrefixCls = 'sticon'
  if (prefixCls) {
    iconPrefixCls = `${prefixCls}`
  }
  return <span className={iconPrefixCls}>{children}</span>
}
