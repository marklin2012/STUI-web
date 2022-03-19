import React from 'react'
import classNames from 'classnames'
import { GenerateConfig } from 'rc-picker/lib/generate'
import { RangePicker as RCRangePicker } from 'rc-picker'
import { PickerComponentClass } from './interface'
import { getTimeProps, PickerLocale, RangePickerProps, Components } from '.'
import zhCN from '../locale/zh_CN'
import Icon from '../../icon'
import { getRangePlaceholder } from '../util'

export default function generateRangePicker<DateType>(
  generateConfig: GenerateConfig<DateType>,
): PickerComponentClass<RangePickerProps<DateType>> {
  class RangePicker extends React.Component<RangePickerProps<DateType>> {
    pickerRef = React.createRef<RCRangePicker<DateType>>()

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
      const { format, showTime, picker } = this.props as any
      const prefixCls = customPrefixCls ?? 'st-picker'
      let additionalOverrideProps: any = {}
      additionalOverrideProps = {
        ...additionalOverrideProps,
        ...(showTime ? getTimeProps({ format, picker, ...showTime }) : {}),
        ...(picker === 'time' ? getTimeProps({ format, picker }) : null),
      }
      const rootPrefixCls = 'st'
      const size = customSize ?? 'middle'
      const iconColor = '#C4C5C7'

      return (
        <RCRangePicker<DateType>
          separator={
            <span aria-label="to" className={`${prefixCls}-separator`}>
              -
            </span>
          }
          ref={this.pickerRef}
          placeholder={getRangePlaceholder(picker, locale, placeholder)}
          suffixIcon={
            picker === 'time' ? (
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
          {...restProps}
          {...additionalOverrideProps}
          className={classNames(
            {
              [`${prefixCls}-${size}`]: size,
              [`${prefixCls}-borderless`]: !bordered,
            },
            className,
          )}
          locale={locale!.lang}
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

  return RangePicker
}
