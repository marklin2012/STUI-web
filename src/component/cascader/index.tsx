import React from 'react'
import classNames from 'classnames'
import RcCascader from 'rc-cascader'
import {
  SingleCascaderProps as RcSingleCascaderProps,
  MultipleCascaderProps as RcMultipleCascaderProps,
  BaseOptionType,
  DefaultOptionType,
} from 'rc-cascader'
import { DirectionType, SizeType } from '../_util/type'
import omit from 'rc-util/lib/omit'
import Icon from '../icon'
import getSelectIcons from '../select/iconUtil'
import { getTransitionName } from '../_util/motion'

type SingleCascaderProps = Omit<RcSingleCascaderProps, 'checkable' | 'options'> & {
  multiple?: false
}

type MultipleCascaderProps = Omit<RcMultipleCascaderProps, 'checkable' | 'options'> & {
  multiple: true
}

type UnionCascaderProps = SingleCascaderProps | MultipleCascaderProps

export type CascaderProps<DataNodeType> = UnionCascaderProps & {
  multiple?: boolean
  size?: SizeType
  bordered?: boolean
  direction?: DirectionType

  suffixIcon?: React.ReactNode
  options?: DataNodeType[]
}

export interface CascaderRef {
  foucus: () => void
  blur: () => void
}

const Cascader = React.forwardRef((props: CascaderProps<any>, ref: React.Ref<CascaderRef>) => {
  const {
    prefixCls: customPrefixCls,
    size: customSize,
    className,
    multiple,
    bordered = true,
    transitionName,
    choiceTransitionName = '',
    dropdownClassName,
    expandIcon,
    allowClear = true,
    notFoundContent,
    direction,
    getPopupContainer,
    ...rest
  } = props

  const restProps = omit(rest, ['suffixIcon' as any])
  const isRtl = direction === 'rtl'

  // Prefix
  const prefixCls = customPrefixCls ?? 'st-select'
  const cascaderPrefixCls = customPrefixCls ?? 'st-cascader'

  // DropDown
  const mergedDropDownClassName = classNames(dropdownClassName, `${cascaderPrefixCls}-dropdown`, {
    [`${cascaderPrefixCls}-dropdown-rtl`]: isRtl,
  })

  // Size
  const size = customSize ?? 'middle'

  // Icon
  let mergedExpandIcon = expandIcon
  if (!expandIcon) {
    mergedExpandIcon = isRtl ? <Icon icon={'angle-left'} /> : <Icon icon={'angle-right'} />
  }

  const loadingIcon = (
    <span className={`${prefixCls}-menu-item-loading-icon`}>
      <Icon icon={'ramp-loading'} />
    </span>
  )

  const { suffixIcon, removeIcon, clearIcon } = getSelectIcons({
    ...props,
    multiple,
    prefixCls,
  })

  // Multiple
  const checkable = React.useMemo(
    () => (multiple ? <span className={`${cascaderPrefixCls}-checkbox-inner`} /> : false),
    [multiple],
  )

  // className
  const cascaderClsName = classNames(
    cascaderPrefixCls,
    {
      [`${prefixCls}-lg`]: size === 'large',
      [`${prefixCls}-sm`]: size === 'small',
      [`${prefixCls}-rtl`]: isRtl,
      [`${prefixCls}-borderless`]: !bordered,
    },
    className,
  )

  return (
    <RcCascader
      prefixCls={prefixCls}
      className={cascaderClsName}
      {...(restProps as any)}
      direction={direction}
      allowClear={allowClear}
      expandIcon={mergedExpandIcon}
      inputIcon={suffixIcon}
      removeIcon={removeIcon}
      clearIcon={clearIcon}
      loadingIcon={loadingIcon}
      checkable={checkable}
      dropdownClassName={mergedDropDownClassName}
      dropdownPrefixCls={customPrefixCls || cascaderPrefixCls}
      choiceTransitionName={getTransitionName('st', '', choiceTransitionName)}
      transitionName={getTransitionName('st', 'slide-up', transitionName)}
      getPopupContainer={getPopupContainer}
      ref={ref}
    ></RcCascader>
  )
}) as (<OptionType extends BaseOptionType | DefaultOptionType = DefaultOptionType>(
  props: React.PropsWithChildren<CascaderProps<OptionType>> & { ref?: React.Ref<CascaderRef> },
) => React.ReactElement) & {
  displayName: string
}

Cascader.displayName = 'Cascader'

export default Cascader
