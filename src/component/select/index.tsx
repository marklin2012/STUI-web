import React from 'react'
import classNames from 'classnames'
import omit from 'rc-util/lib/omit'
import RcSelect, { Option, OptGroup, SelectProps as RcSelectProps, BaseSelectRef } from 'rc-select'
import type { BaseOptionType, DefaultOptionType } from 'rc-select/lib/Select'
import { DirectionType, SizeType } from '../_util/type'
import getSelectIcons from './iconUtil'
import { getTransitionName } from '../_util/motion'

type RawValue = string | number

export interface LabeledValue {
  key?: string
  value: RawValue
  label: React.ReactNode
}

export type SelectValue = RawValue | RawValue[] | LabeledValue | LabeledValue[] | undefined

export interface InternalSelectProps<
  ValueType = any,
  OptionType extends BaseOptionType | DefaultOptionType = DefaultOptionType,
> extends Omit<RcSelectProps<ValueType, OptionType>, 'mode'> {
  suffixIcon?: React.ReactNode
  size?: SizeType
  mode?: 'multiple' | 'tags' | 'SECRET_COMBOBOX_MODE_DO_NOT_USE'
  bordered?: boolean
  direction?: DirectionType
  virtual?: boolean
}

export interface SelectProps<
  ValueType = any,
  OptionType extends BaseOptionType | DefaultOptionType = DefaultOptionType,
> extends Omit<
    InternalSelectProps<ValueType, OptionType>,
    'inputIcon' | 'mode' | 'getInputElement' | 'getRawInputElement' | 'backfill'
  > {
  mode?: 'multiple' | 'tags'
}

const SECRET_COMBOBOX_MODE_DO_NOT_USE = 'SECRET_COMBOBOX_MODE_DO_NOT_USE'

const InternalSelect = <OptionType extends BaseOptionType | DefaultOptionType = DefaultOptionType>(
  {
    prefixCls: customPrefixCls,
    bordered = true,
    className,
    getPopupContainer,
    dropdownClassName,
    listHeight = 168,
    listItemHeight = 32,
    size: customSize,
    notFoundContent,
    direction,
    virtual,
    dropdownMatchSelectWidth,
    ...restProps
  }: SelectProps<OptionType>,
  ref: React.Ref<BaseSelectRef>,
) => {
  const size = customSize ?? 'middle'
  const prefixCls = customPrefixCls ?? 'st-select'
  const rootPrefixCls = 'st'

  const mode = React.useMemo(() => {
    const { mode: m } = restProps as InternalSelectProps<OptionType>
    if ((m as any) === 'combobox') {
      return undefined
    }
    if (m === SECRET_COMBOBOX_MODE_DO_NOT_USE) {
      return 'combobox'
    }
    return m
  }, [restProps.mode])

  const isMutiple = mode === 'multiple' || mode === 'tags'

  let mergedNotFound: React.ReactNode
  if (notFoundContent !== undefined) {
    mergedNotFound = notFoundContent
  } else if (mode === 'combobox') {
    mergedNotFound = null
  } else {
    // 加载select的默认空视图 暂时为null
    mergedNotFound = null
  }

  // 获取icons
  const { suffixIcon, itemIcon, removeIcon, clearIcon } = getSelectIcons({
    ...restProps,
    multiple: isMutiple,
    prefixCls,
  })

  const selectProps = omit(restProps as typeof restProps & { itemIcon: any }, [
    'suffixIcon',
    'itemIcon',
  ])

  const rcSelectRtlDropDownClassName = classNames(dropdownClassName, {
    [`${prefixCls}-dropdown-${direction}`]: direction === 'rtl',
  })

  const mergedClassName = classNames(
    {
      [`${prefixCls}-lg`]: size === 'large',
      [`${prefixCls}-sm`]: size === 'small',
      [`${prefixCls}-rtl`]: direction === 'rtl',
      [`${prefixCls}-borderless`]: !bordered,
    },
    className,
  )

  return (
    <RcSelect<any, any>
      ref={ref as any}
      virtual={virtual}
      dropdownMatchSelectWidth={dropdownMatchSelectWidth}
      {...selectProps}
      transitionName={getTransitionName('st', 'slide-up', restProps.transitionName)}
      listHeight={listHeight}
      listItemHeight={listItemHeight}
      mode={mode as any}
      prefixCls={prefixCls}
      direction={direction}
      inputIcon={suffixIcon}
      menuItemSelectedIcon={itemIcon}
      removeIcon={removeIcon}
      clearIcon={clearIcon}
      notFoundContent={mergedNotFound}
      className={mergedClassName}
      getPopupContainer={getPopupContainer}
      dropdownClassName={rcSelectRtlDropDownClassName}
    />
  )
}

const Select = React.forwardRef(InternalSelect) as unknown as (<
  ValueType = any,
  OptionType extends BaseOptionType | DefaultOptionType = DefaultOptionType,
>(
  props: React.PropsWithChildren<SelectProps<ValueType, OptionType>> & {
    ref?: React.Ref<BaseSelectRef>
  },
) => React.ReactElement) & {
  SECRET_COMBOBOX_MODE_DO_NOT_USE: string
  Option: typeof Option
  OptGroup: typeof OptGroup
}

Select.SECRET_COMBOBOX_MODE_DO_NOT_USE = SECRET_COMBOBOX_MODE_DO_NOT_USE
Select.Option = Option
Select.OptGroup = OptGroup

export default Select
