import classNames from 'classnames'
import RCPicker from 'rc-picker'
import { GenerateConfig } from 'rc-picker/lib/generate'
import { PickerMode } from 'rc-picker/lib/interface'
import React from 'react'
import {
  PickerProps,
  PickerLocale,
  PickerDateProps,
  PickerTimeProps,
  getTimeProps,
  Components,
} from '.'
import Icon from '../../icon'
import zhCN from '../locale/zh_CN'
import { getPlaceHolder } from '../util'
import { PickerComponentClass } from './interface'

export default function generatePicker<DateType>(generateConfig: GenerateConfig<DateType>) {
  type DatePickerProps = PickerProps<DateType>

  function getPicker<InnerPickerProps extends DatePickerProps>(
    picker?: PickerMode,
    displayName?: string,
  ) {
    class Picker extends React.Component<InnerPickerProps> {
      static displayName: string

      pickerRef = React.createRef<RCPicker<DateType>>()

      constructor(props: InnerPickerProps) {
        super(props)
      }

      focus = () => {
        if (this.pickerRef.current) {
          this.pickerRef.current.focus()
        }
      }

      blur = () => {
        if (this.pickerRef.current) {
          this.pickerRef.current.blur()
        }
      }

      renderPicker = (contextLocale: PickerLocale) => {
        const locale = { ...contextLocale, ...this.props.locale }
        const {
          prefixCls: customPrefixCls,
          getPopupContainer: customGetPopupContainer,
          className,
          size: customSize,
          bordered = true,
          placeholder,
          direction,
          ...restProps
        } = this.props
        const { format, showTime } = this.props as any
        const prefixCls = customPrefixCls ?? 'st-picker'
        const additionalProps = { showToday: true }
        let additionalOverrideProps: any = {}
        if (picker) {
          additionalOverrideProps.picker = picker
        }
        const mergedPicker = picker || this.props.picker

        additionalOverrideProps = {
          ...additionalOverrideProps,
          ...(showTime ? getTimeProps({ format, picker: mergedPicker, ...showTime }) : {}),
          ...(mergedPicker === 'time'
            ? getTimeProps({ format, ...this.props, picker: mergedPicker })
            : {}),
        }
        const rootPrefixCls = 'st'
        const size = customSize ?? 'middle'
        const iconColor = '#C4C5C7'

        return (
          <RCPicker<DateType>
            ref={this.pickerRef}
            placeholder={getPlaceHolder(mergedPicker, locale, placeholder)}
            suffixIcon={
              mergedPicker === 'time' ? (
                <Icon icon={'clock-rotate-left'} color={iconColor} />
              ) : (
                <Icon icon={'calendar'} color={iconColor} />
              )
            }
            clearIcon={<Icon icon={'circle-xmark'} color={iconColor} />}
            prevIcon={<span className={`${prefixCls}-prev-icon`} />}
            nextIcon={<span className={`${prefixCls}-next-icon`} />}
            superPrevIcon={<span className={`${prefixCls}-super-prev-icon`} />}
            superNextIcon={<span className={`${prefixCls}-super-next-icon`} />}
            allowClear
            transitionName={`${rootPrefixCls}-slide-up`}
            {...additionalProps}
            {...restProps}
            {...additionalOverrideProps}
            locale={locale!.lang}
            className={classNames(
              {
                [`${prefixCls}-${size}`]: size,
                [`${prefixCls}-borderless`]: !bordered,
              },
              className,
            )}
            prefixCls={prefixCls}
            getPopupContainer={customGetPopupContainer}
            generateConfig={generateConfig}
            components={Components}
            direction={direction}
          />
        )
      }

      render() {
        return <>{this.renderPicker(zhCN)}</>
      }
    }

    if (displayName) {
      Picker.displayName = displayName
    }

    return Picker as PickerComponentClass<InnerPickerProps>
  }

  const DatePicker = getPicker<DatePickerProps>()
  const WeekPicker = getPicker<Omit<PickerDateProps<DateType>, 'picker'>>('week', 'WeekPicker')
  const MonthPicker = getPicker<Omit<PickerDateProps<DateType>, 'picker'>>('month', 'MonthPicker')
  const YearPicker = getPicker<Omit<PickerDateProps<DateType>, 'picker'>>('year', 'YearPicker')
  const TimePicker = getPicker<PickerTimeProps<DateType>>('time', 'TimePicker')
  const QuarterPicker = getPicker<PickerTimeProps<DateType>>('quarter', 'QuarterPicker')

  return { DatePicker, WeekPicker, MonthPicker, YearPicker, TimePicker, QuarterPicker }
}
