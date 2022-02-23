import React from 'react'
import classNames from 'classnames'
import { PresetColorType, PresetColorTypes } from '../_util/colors'
import { LiteralUnion } from '../_util/type'
import './style'

type RibbonPlacement = 'start' | 'end'

const prefixCls = 'st-badge-ribbon'

function isPresetColor(color?: string): boolean {
  return (PresetColorTypes as any[]).indexOf(color) !== -1
}

export interface RibbonProps {
  className?: string
  style?: React.CSSProperties
  text?: React.ReactNode
  color?: LiteralUnion<PresetColorType, string>
  children?: React.ReactNode
  placement?: RibbonPlacement
  direction?: 'ltr' | 'rtl'
}

const Ribbon: React.FC<RibbonProps> = ({
  className,
  style,
  color,
  children,
  text,
  placement = 'end',
  direction = 'ltr',
}) => {
  const colorInPreset = isPresetColor(color)
  const ribbonCls = classNames(
    prefixCls,
    `${prefixCls}-placement-${placement}`,
    {
      [`${prefixCls}-rtl`]: direction === 'rtl',
      [`${prefixCls}-color-${color}`]: colorInPreset,
    },
    className,
  )
  const colorStyle: React.CSSProperties = {}
  const cornerColorStyle: React.CSSProperties = {}

  if (color && !colorInPreset) {
    colorStyle.background = color
    cornerColorStyle.color = color
  }

  return (
    <div className={`${prefixCls}-wrapper`}>
      {children}
      <div className={ribbonCls} style={{ ...colorStyle, ...style }}>
        <span className={`${prefixCls}-text`}>{text}</span>
        <span className={`${prefixCls}-corner`} style={cornerColorStyle}></span>
      </div>
    </div>
  )
}

export default Ribbon
