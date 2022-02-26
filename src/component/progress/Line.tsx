import { DirectionType } from '../_util/type'
import { ProgressGradient, ProgressProps, StringGradients } from './progress'
import React from 'react'
import { validProgress } from './utils'

interface LineProps extends ProgressProps {
  direction?: DirectionType
}

export const sortGradient = (gradients: StringGradients) => {
  let tempArr: any[] = []
  Object.keys(gradients).forEach((key) => {
    const formattedKey = parseFloat(key.replace(/%/g, ''))
    if (!isNaN(formattedKey)) {
      tempArr.push({ key: formattedKey, value: gradients[key] })
    }
  })
  tempArr = tempArr.sort((a, b) => a.key - b.key)
  return tempArr.map(({ key, value }) => `${value} ${key}%`).join(', ')
}

export const handleGradient = (strokeColor: ProgressGradient, directionConfig: DirectionType) => {
  const {
    from = 'blue',
    to = 'blue',
    direction = directionConfig === 'rtl' ? 'to left' : 'to right',
    ...rest
  } = strokeColor

  if (Object.keys(rest).length !== 0) {
    const sortedGradients = sortGradient(rest as StringGradients)
    return { backgroundImage: `linear-gradient(${direction}, ${sortedGradients})` }
  }
  return { backgroundImage: `linear-gradient(${direction}, ${from}, ${to})` }
}

const Line: React.FC<LineProps> = (props) => {
  const {
    prefixCls,
    direction: directionConfig,
    percent,
    strokeWidth,
    size,
    strokeColor,
    strokeLinecap,
    children,
    trailColor,
    success,
  } = props

  const backgroundProps =
    strokeColor && typeof strokeColor !== 'string'
      ? handleGradient(strokeColor, directionConfig)
      : { background: strokeColor }

  const trailStyle = trailColor ? { backgroundColor: trailColor } : undefined

  const percentStyle = {
    width: `${validProgress(percent)}%`,
    height: strokeWidth || (size === 'small' ? 6 : 8),
    borderRadius: strokeLinecap === 'square' ? 0 : '',
    ...backgroundProps,
  } as React.CSSProperties

  const successPercent = success?.percent

  const successPercentStyle = {
    width: `${validProgress(successPercent)}%`,
    height: strokeWidth || (size === 'small' ? 6 : 8),
    borderRadius: strokeLinecap === 'square' ? 0 : '',
    backgroundColor: success?.strokeColor,
    ...backgroundProps,
  } as React.CSSProperties

  const successSegment =
    successPercent !== undefined ? (
      <div className={`${prefixCls}-success-bg`} style={successPercentStyle} />
    ) : null

  return (
    <>
      <div className={`${prefixCls}-outer`}>
        <div className={`${prefixCls}-inner`} style={trailStyle}>
          <div className={`${prefixCls}-bg`} style={percentStyle} />
          {successSegment}
        </div>
      </div>
      {children}
    </>
  )
}

export default Line
