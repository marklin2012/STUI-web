import { Moment } from 'moment'
import React from 'react'
import DatePicker from '../datePicker'
import { PickerTimeProps, RangePickerTimeProps } from '../datePicker/generatePicker'

const { TimePicker: InternalTimePicker, RangePicker: InternalRangePicker } = DatePicker

export interface TimePickerLocale {
  placeholder?: string
  rangePlaceholder?: [string, string]
}

export interface TimeRangePickerProps extends Omit<RangePickerTimeProps<Moment>, 'picker'> {
  popupClassName?: string
}

const RangePicker = React.forwardRef<any, TimeRangePickerProps>((props, ref) => (
  <InternalRangePicker
    {...props}
    dropdownClassName={props.popupClassName}
    picker="time"
    mode={undefined}
    ref={ref}
  />
))

export interface TimePickerProps extends Omit<PickerTimeProps<Moment>, 'picker'> {
  addon?: () => React.ReactNode
  popupClassName?: string
}

const TimePicker = React.forwardRef<any, TimePickerProps>(
  ({ addon, renderExtraFooter, popupClassName, ...restProps }, ref) => {
    const internalRenderExtraFooter = React.useMemo(() => {
      if (renderExtraFooter) {
        return renderExtraFooter
      }
      if (addon) {
        return addon
      }
      return undefined
    }, [addon, renderExtraFooter])

    return (
      <InternalTimePicker
        {...restProps}
        dropdownClassName={popupClassName}
        mode={undefined}
        ref={ref}
        renderExtraFooter={internalRenderExtraFooter}
        picker={'time'}
      />
    )
  },
)

TimePicker.displayName = 'TimePicker'

type MergedTimePicker = typeof TimePicker & {
  RangePicker: typeof RangePicker
}

;(TimePicker as MergedTimePicker).RangePicker = RangePicker

export default TimePicker as MergedTimePicker
