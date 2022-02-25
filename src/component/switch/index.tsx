import React, { useState } from 'react'
import classNames from 'classnames'

const prefixCls = 'st-switch'
const prefixClsShape = 'st-switch-shape'
const prefixClsPval = 'st-switch-pval'
const prefixClsText = 'st-switch-text'

export type SwitchSize = 'default' | 'small'
export type SwitchChildrenPositon = 'in' | 'out' | undefined
export type SwitchChangeEventHandler = (checked: boolean) => void

export interface SwitchProps {
  autoFocus?: boolean
  checked?: boolean
  className?: string
  disabled?: boolean
  size?: SwitchSize
  childrensPosition?: SwitchChildrenPositon
  checkedChildren?: React.ReactNode
  unCheckedChildren?: React.ReactNode
  onChange?: SwitchChangeEventHandler
  id?: string
}

const Switch: React.FC<SwitchProps> = ({
  className = '',
  size = 'default',
  disabled,
  checked = false,
  childrensPosition = undefined,
  checkedChildren,
  unCheckedChildren,
  onChange,
}) => {
  const [isChecked, setIsChecked] = React.useState(checked)

  const isSizeSmall = () => {
    return size === 'small'
  }

  const isTextShowIn = () => {
    return childrensPosition === 'in'
  }

  const isTextShowOut = () => {
    return childrensPosition === 'out'
  }

  let shapeClasses = classNames(
    {
      [`${prefixClsShape}`]: !isChecked,
      [`${prefixClsShape}-disabled`]: disabled,
      [`${prefixClsShape}-checked`]: isChecked,
      [`${prefixClsShape}-checked-disabled`]: isChecked && disabled,
      [`${prefixClsShape}-small`]: size === 'small' && !isChecked,
      [`${prefixClsShape}-checked-small`]: size === 'small' && isChecked,
    },
    className,
  )

  let pvalClasses = classNames({
    [`${prefixClsPval}`]: !isChecked,
    [`${prefixClsPval}-checked`]: isChecked,
    [`${prefixClsPval}-small`]: size === 'small' && !isChecked,
    [`${prefixClsPval}-checked-small`]: size === 'small' && isChecked,
  })

  let textClasses = classNames({
    [`${prefixClsText}`]: !isChecked,
    [`${prefixClsText}-checked`]: isChecked,
    [`${prefixClsText}-out`]: !isChecked && isTextShowOut(),
    [`${prefixClsText}-checked-out`]: isChecked && isTextShowOut(),
  })

  const textNode = () => {
    if (isSizeSmall()) {
      return null
    }
    return <span className={textClasses}>{isChecked ? checkedChildren : unCheckedChildren}</span>
  }

  return (
    <div className={prefixCls}>
      <div className={shapeClasses} onClick={clickAction}>
        <div className={pvalClasses} />
        {isTextShowIn() ? textNode() : null}
      </div>
      {isTextShowOut() ? textNode() : null}
    </div>
  )

  function clickAction() {
    if (disabled) return
    const temp = !isChecked
    setIsChecked(temp)
    if (onChange) {
      onChange!(temp)
    }
  }
}

export default Switch
