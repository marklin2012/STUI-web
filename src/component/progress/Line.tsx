import { DirectionType } from '../_util/type'
import { ProgressGradient, ProgressProps, StringGradients } from './progress'
import React from 'react'
import { validProgress } from './utils'
import classNames from 'classnames'

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
    display = 'out',
    axis = 'horizontal',
    showInfo,
  } = props

  const backgroundProps =
    strokeColor && typeof strokeColor !== 'string'
      ? handleGradient(strokeColor, directionConfig)
      : { background: strokeColor }

  const trailStyle = trailColor ? { backgroundColor: trailColor } : undefined

  const isDisplayIn = () => display === 'in'

  const isAxisVertical = () => axis === 'vertical'

  const mainLength = `${validProgress(percent)}%`
  const crossLength = strokeWidth || (display === 'in' && 24) || (size === 'small' ? 6 : 8)

  const percentStyle = {
    width: isAxisVertical() ? crossLength : mainLength,
    height: isAxisVertical() ? mainLength : crossLength,
    borderRadius: strokeLinecap === 'square' ? 0 : '',
    ...backgroundProps,
  } as React.CSSProperties

  const successPercent = success?.percent

  const successPercentStyle = {
    width: isAxisVertical() ? crossLength : mainLength,
    height: isAxisVertical() ? mainLength : crossLength,
    borderRadius: strokeLinecap === 'square' ? 0 : '',
    backgroundColor: success?.strokeColor,
    ...backgroundProps,
  } as React.CSSProperties

  const successSegment =
    successPercent !== undefined ? (
      <div className={`${prefixCls}-success-bg`} style={successPercentStyle} />
    ) : null

  let prefixClsName = `${prefixCls}`
  if (isAxisVertical()) {
    prefixClsName += '-vertical'
  }

  let outerClassName = classNames(`${prefixClsName}-outer`, {
    [`${prefixClsName}-outer-show-info`]: showInfo,
  })

  return (
    <>
      {(isAxisVertical() && !isDisplayIn() && children) || null}
      <div className={outerClassName}>
        <div className={`${prefixClsName}-inner`} style={trailStyle}>
          <div className={`${prefixClsName}-bg`} style={percentStyle}>
            {isDisplayIn() ? children : null}
          </div>
          {successSegment}
        </div>
      </div>
      {(!isAxisVertical() && !isDisplayIn() && children) || null}
    </>
  )
}

export default Line
