import classNames from 'classnames'
import RcCheckbox from 'rc-checkbox'
import { composeRef } from 'rc-util/lib/ref'
import React from 'react'
import RadioGroupContext from './context'
import { RadioChangeEvent, RadioProps } from './interface'

const InternalRadio: React.ForwardRefRenderFunction<HTMLElement, RadioProps> = (props, ref) => {
  const context = React.useContext(RadioGroupContext)
  const innerRef = React.useRef<HTMLElement>()
  const mergeRef = composeRef(ref, innerRef)

  const onChange = (e: RadioChangeEvent) => {
    props.onChange?.(e)
    context?.onChange?.(e)
  }

  const { prefixCls: customPrefixCls, className, children, style, direction, ...restProps } = props
  const prefixCls = customPrefixCls ?? 'st-radio'
  const radioProps: RadioProps = { ...restProps, onChange: onChange }
  if (context) {
    radioProps.name = context.name
    radioProps.onChange = onChange
    radioProps.checked = props.value === context.value
    radioProps.disabled = props.disabled || context.disabled
  }
  const wrapperClsString = classNames(
    `${prefixCls}-wrapper`,
    {
      [`${prefixCls}-wrapper-checked`]: radioProps.checked,
      [`${prefixCls}-wrapper-disabled`]: radioProps.disabled,
      [`${prefixCls}-wrapper-rtl`]: direction === 'rtl',
    },
    className,
  )

  return (
    <label
      className={wrapperClsString}
      style={style}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
    >
      <RcCheckbox {...radioProps} type="radio" prefixCls={prefixCls} ref={mergeRef} />
      {children !== undefined ? <span>{children}</span> : null}
    </label>
  )
}

const STRadio = React.forwardRef<HTMLElement, RadioProps>(InternalRadio)

STRadio.displayName = 'Radio'

export default STRadio
