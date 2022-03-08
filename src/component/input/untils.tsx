import classNames from 'classnames'
import { DirectionType } from '../_util/type'
import { ClearableInputProps } from './clearableLabelInput'
import { InputProps } from './input'

export type InputSizeType = 'small' | 'middle' | 'large' | undefined

export function getInputClassName(
  prefixCls: string,
  bordered: boolean,
  size?: InputSizeType,
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
