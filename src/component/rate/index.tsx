import React from 'react'
import RcRate from 'rc-rate'
import Tooltip from '../tooltip'
import { DirectionType, SizeType } from '../_util/type'
import Icon from '../icon'
import { SizeProp } from '@fortawesome/fontawesome-svg-core'

export interface RateProps {
  prefixCls?: string
  count?: number
  value?: number // 当前值
  defaultValue?: number // 默认值
  allowHalf?: boolean
  allowClear?: boolean
  disabled?: boolean
  tooltips?: Array<string> // 自定义每项的提示信息
  onChange?: (value: number) => void
  onHoverChange?: (value: number) => void
  character?: React.ReactNode // 自定义字符
  className?: string
  style?: React.CSSProperties
  direction?: DirectionType
  size?: SizeProp
}

interface RateNodeProps {
  index: number
}

const Rate = React.forwardRef<unknown, RateProps>(
  ({ prefixCls: customPrefixCls, tooltips, direction, ...props }, ref) => {
    const characterRender = (node: React.ReactElement, { index }: RateNodeProps) => {
      if (!tooltips) return node
      return <Tooltip title={tooltips[index]}>{node}</Tooltip>
    }
    const prefixCls = customPrefixCls ?? 'st-rate'

    const getDefaultCharacter = () => {
      return <Icon icon={'star'} size={props.size} />
    }
    const internalCharacter = props.character ?? getDefaultCharacter()
    const newProps: RateProps = { ...props, character: internalCharacter }

    return (
      <RcRate
        ref={ref}
        characterRender={characterRender}
        {...newProps}
        prefixCls={prefixCls}
        direction={direction}
      />
    )
  },
)

Rate.displayName = 'Rate'

export default Rate
