import React from 'react'
import RcSlider, { Range as RcRange, Handle as RcHandle } from 'rc-slider'
import classNames from 'classnames'
import { TooltipPlacement } from '../tooltip'
import { DirectionType } from '../_util/type'
import SliderTooltip from './sliderTooltip'

export interface SliderMarks {
  // 刻度标记，key 的类型必须为 number 且取值在闭区间 [min, max] 内，每个标签可以单独设置样式
  [key: number]: React.ReactNode | { style: React.CSSProperties; label: React.ReactNode }
}

interface HandleGeneratorInfo {
  value?: number
  dragging?: boolean
  index: number
}

export type HandleGeneratorFn = (config: {
  tooltipPrefixCls?: string
  prefixCls?: string
  info: HandleGeneratorInfo
}) => React.ReactElement

export interface SliderBaseProps {
  prefixCls?: string
  tooltipPrefixCls?: string
  min?: number
  max?: number
  step?: number | null // step为每次移动的距离，为null时只能选择marks的标记点
  marks?: SliderMarks
  dots?: boolean // 是否只能拖动到刻度上
  included?: boolean // marks 不为空对象时有效，值为 true 时表示值为包含关系，false 表示并列即没有选中非选中
  disabled?: boolean
  vertical?: boolean
  tipFormatter?: null | ((value?: number) => React.ReactNode)
  className?: string
  id?: string
  style?: React.CSSProperties
  tooltipVisible?: boolean
  tooltipPlacement?: TooltipPlacement
  tooltipColor?: string
  getTooltipPopupContainer?: (triggerNode: HTMLElement) => HTMLElement // Tooltip 渲染父节点，默认渲染到 body 上
  autoFocus?: boolean
  direction?: DirectionType
}

export interface SliderSingleProps extends SliderBaseProps {
  range?: false
  value?: number
  defaultValue?: number
  onChange?: (value: number) => void
  onAfterChange?: (value: number) => void
  handleStyle?: React.CSSProperties
  trackStyle?: React.CSSProperties
}

interface SliderRange {
  draggableTrack?: boolean
}

export interface SliderRangeProps extends SliderBaseProps {
  range?: true | SliderRange
  value?: number[]
  defaultValue?: number[]
  onChange?: (value: number[]) => void
  onAfterChange?: (value: number[]) => void
  handleStyle?: React.CSSProperties[]
  trackStyle?: React.CSSProperties[]
}

export type Visibles = { [index: number]: boolean }

export interface ConfigPopupProps {
  getPopupContainer?: (triggerNode?: HTMLElement) => HTMLElement
}

export const ConfigPopupContext = React.createContext<ConfigPopupProps>({})

const Slider = React.forwardRef<unknown, SliderSingleProps | SliderRangeProps>(
  (props, ref: any) => {
    const direction = props.direction
    const { getPopupContainer } = React.useContext(ConfigPopupContext)
    const [visibles, setVisibles] = React.useState<Visibles>({})

    const toggleTooltipVisible = (index: number, visible: boolean) => {
      setVisibles((prev: Visibles) => ({ ...prev, [index]: visible }))
    }

    const getTooltioPlacement = (tooltipPlacement?: TooltipPlacement, vertical?: boolean) => {
      if (tooltipPlacement) return tooltipPlacement
      if (!vertical) return 'top'
      return direction === 'rtl' ? 'left' : 'right'
    }

    const handleWithTooltip: HandleGeneratorFn = ({
      tooltipPrefixCls,
      prefixCls,
      info: { value, dragging, index, ...restProps },
    }) => {
      const {
        tipFormatter,
        tooltipVisible,
        tooltipColor,
        tooltipPlacement,
        getTooltipPopupContainer,
        vertical,
      } = props
      const isTipFormatter = tipFormatter ? visibles[index] || dragging : false
      const visible = tooltipVisible || (tooltipVisible === undefined && isTipFormatter)

      return (
        <SliderTooltip
          prefixCls={tooltipPrefixCls}
          title={tipFormatter ? tipFormatter(value) : ''}
          visible={visible}
          placement={getTooltioPlacement(tooltipPlacement, vertical)}
          transitionName={'st-zoom-down'}
          key={index}
          overlayClassName={`${prefixCls}-tooltip`}
          getPopupContainer={getTooltipPopupContainer || getPopupContainer}
          color={tooltipColor ?? '#1070ff'}
        >
          <RcHandle
            {...restProps}
            value={value}
            onMouseEnter={() => toggleTooltipVisible(index, true)}
            onMouseLeave={() => toggleTooltipVisible(index, false)}
          />
        </SliderTooltip>
      )
    }

    const {
      prefixCls: customPrefixCls,
      tooltipPrefixCls: customTooltipPrefixCls,
      range,
      className,
      ...restProps
    } = props
    const prefixCls = customPrefixCls ?? 'st-slider'
    const tooltipPrefixCls = customTooltipPrefixCls ?? 'st-tooltip'
    const clsName = classNames(className, {
      [`${prefixCls}-rtl`]: direction === 'rtl',
    })

    let draggableTrack: boolean | undefined
    if (typeof range === 'object') {
      draggableTrack = range.draggableTrack
    }

    if (range) {
      return (
        <RcRange
          {...(restProps as SliderRangeProps)}
          step={restProps.step!}
          draggableTrack={draggableTrack}
          className={clsName}
          ref={ref}
          handle={(info: HandleGeneratorInfo) =>
            handleWithTooltip({
              tooltipPrefixCls,
              prefixCls,
              info,
            })
          }
          prefixCls={prefixCls}
        />
      )
    }
    return (
      <RcSlider
        {...(restProps as SliderSingleProps)}
        step={restProps.step!}
        className={clsName}
        ref={ref}
        handle={(info: HandleGeneratorInfo) =>
          handleWithTooltip({
            tooltipPrefixCls,
            prefixCls,
            info,
          })
        }
        prefixCls={prefixCls}
      />
    )
  },
)

Slider.displayName = 'Slider'

Slider.defaultProps = {
  tipFormatter(value?: number) {
    const str = typeof value === 'number' ? value.toString() : ''
    return <>{str}</>
  },
}

export default Slider
