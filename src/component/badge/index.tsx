import React, { cloneElement } from 'react'
import classNames from 'classnames'
import ScrollNumber from './scrollNumber'
import { PresetColorTypes, PresetColorType, PresetStatusColorType } from '../_util/colors'
import { LiteralUnion } from '../_util/type'
import Ribbon from './ribbon'
import CSSMotion from 'rc-motion'

export interface BadgeProps {
  count?: React.ReactNode
  showZero?: boolean
  overflowCount?: number
  dot?: boolean
  style?: React.CSSProperties
  className?: string
  status?: PresetStatusColorType
  color?: LiteralUnion<PresetColorType, string>
  text?: React.ReactNode
  offset?: [number | string, number | string]
  title?: string
  direction?: 'ltr' | 'rtl'
  size?: 'default' | 'small'
}

function isPresetColor(color?: string): boolean {
  return (PresetColorTypes as any[]).indexOf(color) !== -1
}

const prefixCls = 'st-badge'

interface CompoundedComponent extends React.FC<BadgeProps> {
  Ribbon: typeof Ribbon
}

const Badge: CompoundedComponent = ({
  children,
  status,
  text,
  color,
  count = null,
  overflowCount = 99,
  dot = false,
  title,
  offset,
  style,
  className,
  showZero = false,
  direction = 'ltr',
  size = 'default',
}) => {
  const getNumberedDisplayCount = () => {
    const displayCount = (count as number) > (overflowCount as number) ? `${overflowCount}+` : count
    return displayCount as string | number | null
  }

  const hasStatus = (): boolean => {
    return !!status || !!color
  }

  const isZero = () => {
    const numberedDisplayCount = getNumberedDisplayCount()
    return numberedDisplayCount === '0' || numberedDisplayCount === 0
  }

  const isDot = () => {
    return (dot && !isZero()) || hasStatus()
  }

  const getDisplayCount = () => {
    if (isDot()) {
      return ''
    }
    return getNumberedDisplayCount()
  }

  const getScrollNumberTitle = () => {
    if (title) {
      return title
    }
    return typeof count === 'string' || typeof count === 'number' ? count : undefined
  }

  const getStyleWithOffset = () => {
    if (direction === 'rtl') {
      return offset
        ? {
            left: parseInt(offset[0] as string, 10),
            marginTop: offset[1],
            ...style,
          }
        : style
    }
    return offset
      ? {
          right: -parseInt(offset[0] as string, 10),
          marginTop: offset[1],
          ...style,
        }
      : style
  }

  const isHidden = () => {
    const displayCount = getDisplayCount()
    const isEmpty = displayCount === null || displayCount === undefined || displayCount === ''
    return (isEmpty || (isZero() && !showZero)) && !isDot()
  }

  const renderStatusText = () => {
    const hidden = isHidden()
    return hidden || !text ? null : <span className={`${prefixCls}-status-text`}>{text}</span>
  }

  const renderDisplayComponent = () => {
    const customNode = count as React.ReactElement<any>
    if (!customNode || typeof customNode !== 'object') {
      return undefined
    }
    return cloneElement(customNode, {
      style: {
        ...getStyleWithOffset(),
        ...(customNode.props && customNode.props.style),
      },
    })
  }

  const renderBadgeNumber = () => {
    const displayCount = getDisplayCount()
    const dot = isDot()
    const hidden = isHidden()

    const scrollNumberCls = classNames({
      [`${prefixCls}-dot`]: dot,
      [`${prefixCls}-count`]: !dot,
      [`${prefixCls}-count-sm`]: size === 'small',
      [`${prefixCls}'-multiple-words`]:
        !dot && count && count.toString && count.toString().length > 1,
      [`${prefixCls}-status-${status}`]: !!status,
      [`${prefixCls}-status-${color}`]: isPresetColor(color),
    })

    let statusStyle: React.CSSProperties | undefined = getStyleWithOffset()
    if (color && !isPresetColor(color)) {
      statusStyle = statusStyle || {}
      statusStyle.background = color
    }

    return hidden ? null : (
      <ScrollNumber
        data-show={!hidden}
        className={scrollNumberCls}
        count={displayCount}
        displayComponent={renderDisplayComponent()}
        title={getScrollNumberTitle()}
        style={statusStyle}
        key="scrollNumber"
      />
    )
  }

  const statusCls = classNames({
    [`${prefixCls}-status-dot`]: hasStatus(),
    [`${prefixCls}-status-${status}`]: !!status,
    [`${prefixCls}-status-${color}`]: isPresetColor(color),
  })

  const statusStyle: React.CSSProperties = {}
  if (color && !isPresetColor(color)) {
    statusStyle.background = color
  }

  const badgeClassName = classNames(className, prefixCls, {
    [`${prefixCls}-status`]: hasStatus(),
    [`${prefixCls}-not-a-wrapper`]: !children,
    [`${prefixCls}-rtl`]: direction === 'rtl',
  })

  if (!children && hasStatus()) {
    const styleWithOffset = getStyleWithOffset()
    const statusTextColor = styleWithOffset && styleWithOffset.color
    return (
      <span className={badgeClassName} style={styleWithOffset}>
        <span className={statusCls} style={statusStyle} />
        <span style={{ color: statusTextColor }} className={`${prefixCls}-status-text`}>
          {text}
        </span>
      </span>
    )
  }

  return (
    <span className={badgeClassName}>
      {children}
      {isHidden() ? null : (
        <CSSMotion
          visible={!isHidden()}
          motionName={'st-zoom'}
          motionAppear={false}
          motionDeadline={1000}
        >
          {() => {
            const displayCount = getDisplayCount()
            const dot = isDot()
            const hidden = isHidden()

            const scrollNumberCls = classNames({
              [`${prefixCls}-dot`]: dot,
              [`${prefixCls}-count`]: !dot,
              [`${prefixCls}-count-sm`]: size === 'small',
              [`${prefixCls}'-multiple-words`]:
                !dot && count && count.toString && count.toString().length > 1,
              [`${prefixCls}-status-${status}`]: !!status,
              [`${prefixCls}-status-${color}`]: isPresetColor(color),
            })

            let statusStyle: React.CSSProperties | undefined = getStyleWithOffset()
            if (color && !isPresetColor(color)) {
              statusStyle = statusStyle || {}
              statusStyle.background = color
            }

            return (
              <ScrollNumber
                data-show={!hidden}
                className={scrollNumberCls}
                count={displayCount}
                displayComponent={renderDisplayComponent()}
                title={getScrollNumberTitle()}
                style={statusStyle}
                key="scrollNumber"
              />
            )
          }}
        </CSSMotion>
      )}
      {renderStatusText()}
    </span>
  )
}

Badge.Ribbon = Ribbon

export default Badge
