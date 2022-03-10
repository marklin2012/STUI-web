import classNames from 'classnames'
import { DirectionType, SizeType } from '../_util/type'
import { ClearableInputProps } from './clearableLabelInput'
import { InputProps } from './input'

export function getInputClassName(
  prefixCls: string,
  bordered: boolean,
  size?: SizeType,
  disabled?: boolean,
  direction?: DirectionType,
) {
  return classNames(prefixCls, {
    [`${prefixCls}-sm`]: size === 'small',
    [`${prefixCls}-lg`]: size === 'large',
    [`${prefixCls}-disabled`]: disabled,
    [`${prefixCls}-rtl`]: direction === 'rtl',
    [`${prefixCls}-borderless`]: !bordered,
  })
}

export function hasPrefixSuffix(props: InputProps | ClearableInputProps) {
  return !!(props.prefix || props.suffix || props.allowClear)
}
