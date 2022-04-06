import React from 'react'
import classNames from 'classnames'
import { STTreeNodeProps } from '../stTree'
import { isValidElement, cloneElement } from '../../_util/reactNode'
import { prefixClsIcon } from '../../_util/prefixClsIcon'
import Icon from '../../icon'

export default function renderSwitcherIcon(
  prefixCls: string,
  switcherIcon: React.ReactNode,
  showLine: boolean | { showLeafIcon: boolean } | undefined,
  { isLeaf, expanded, loading }: STTreeNodeProps,
) {
  if (loading) {
    return prefixClsIcon(<Icon icon={'spinner'} />, 'switcher-loading-icon')
  }
  let showLeafIcon
  if (showLine && typeof showLine === 'object') {
    showLeafIcon = showLine.showLeafIcon
  }
  if (isLeaf) {
    if (showLine) {
      if (typeof showLine === 'object' && !showLeafIcon) {
        return <span className={`${prefixCls}-switcher-leaf-line`} />
      }
      return prefixClsIcon(<Icon icon={'file'} />, 'switcher-line-icon')
    }
    return null
  }
  const switcherCls = `${prefixCls}-switcher-icon`
  if (isValidElement(switcherIcon)) {
    const tempIcon = prefixClsIcon(switcherIcon, switcherCls)
    return cloneElement(tempIcon, {
      className: classNames(switcherIcon.props.className || '', switcherCls),
    })
  }

  if (switcherIcon) {
    return switcherIcon
  }

  if (showLine) {
    return expanded
      ? prefixClsIcon(<Icon icon={'minus-square'} />, 'switcher-line-icon')
      : prefixClsIcon(<Icon icon={'plus-square'} />, 'switcher-line-icon')
  }
  return prefixClsIcon(<Icon icon={'caret-down'} />, switcherCls)
}
