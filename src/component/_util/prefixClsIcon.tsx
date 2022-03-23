import React from 'react'

export function prefixClsIcon(children: React.ReactNode, prefixCls?: string) {
  const iconPrefixCls = prefixCls ?? 'sticon'
  return <span className={iconPrefixCls}>{children}</span>
}
