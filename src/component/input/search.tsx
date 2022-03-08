import classNames from 'classnames'
import { composeRef } from 'rc-util/lib/ref'
import React from 'react'
import Icon from '../icon'
import { cloneElement } from '../_util/reactNode'
import { DirectionType } from '../_util/type'
import Input, { InputPrefixCls, InputProps } from './input'
import './style'

export interface SearchProps extends InputProps {
  inputPrefixCls?: string
  onSearch?: (
    value: string,
    event?:
      | React.ChangeEvent<HTMLInputElement>
      | React.MouseEvent<HTMLElement>
      | React.KeyboardEvent<HTMLInputElement>,
  ) => void
  enterButton?: React.ReactNode
  loading?: boolean
  direction?: DirectionType
}

const Search = React.forwardRef<Input, SearchProps>((props, ref) => {
  const {
    prefixCls: customPrefixCls,
    inputPrefixCls: customInputPrefixCls,
    className,
    size: customSize,
    suffix,
    enterButton = false,
    addonAfter,
    loading,
    disabled,
    onSearch: customOnSearch,
    onChange: customOnChange,
    direction,
    ...restProps
  } = props

  const prefixCls = customPrefixCls ?? InputPrefixCls
  const inputPrefixCls = customInputPrefixCls ?? `${InputPrefixCls}-search`
  const size = customSize ?? 'middle'
  const inputRef = React.useRef<Input>(null)

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e && e.target && e.type === 'click' && customOnSearch) {
      customOnSearch((e as React.ChangeEvent<HTMLInputElement>).target.value, e)
    }
    if (customOnChange) {
      customOnChange(e)
    }
  }

  const onMouseDown: React.MouseEventHandler<HTMLElement> = (e) => {
    if (document.activeElement === inputRef.current?.input) {
      e.preventDefault()
    }
  }

  const onSearch = (e: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLInputElement>) => {
    if (customOnSearch) {
      customOnSearch(inputRef.current?.input.value!, e)
    }
  }

  const searchIcon = typeof enterButton === 'boolean' ? <Icon icon={'magnifying-glass'} /> : null
  const btnClassName = `${prefixCls}-button`

  let button
  const enterBtnAsElement = (enterButton || {}) as React.ReactElement
  if (enterBtnAsElement.type === 'button') {
    button = cloneElement(enterBtnAsElement, {
      onMouseDown,
      onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
        enterBtnAsElement?.props?.onClick?.(e)
        onSearch(e)
      },
      key: 'enterButton',
    })
  } else {
    button = (
      <span
        className={btnClassName}
        key="enterButton"
        aria-disabled={disabled}
        onMouseDown={onMouseDown}
        onClick={onSearch}
      >
        {searchIcon}
      </span>
    )
  }

  if (addonAfter) {
    button = [
      button,
      cloneElement(addonAfter, {
        key: 'addonAfter',
      }),
    ]
  }

  const cls = classNames(
    prefixCls,
    {
      [`${prefixCls}-rtl`]: direction === 'rtl',
      [`${prefixCls}-${size}`]: !!size,
      [`${prefixCls}-with-button`]: !!enterButton,
    },
    className,
  )

  return (
    <Input
      ref={composeRef<Input>(inputRef, ref)}
      onPressEnter={onSearch}
      {...restProps}
      size={size}
      prefixCls={inputPrefixCls}
      addonAfter={button}
      suffix={suffix}
      onChange={onChange}
      className={cls}
      disabled={disabled}
    />
  )
})

Search.displayName = 'Search'

export default Search
