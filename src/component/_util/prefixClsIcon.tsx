import React from 'react'

export function prefixClsIcon(children: React.ReactNode, prefixCls?: string) {
  const iconPrefixCls = prefixCls !== undefined ? `sticon-${prefixCls}` : 'sticon'
  return <span className={iconPrefixCls}>{children}</span>
}
