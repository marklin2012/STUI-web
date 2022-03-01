import { identity, omit, pick, pickBy } from 'lodash'
import React, { useState } from 'react'

const prefixCls = 'st-tag'

export interface TagSizesPrps {
  kind: 'normal' | 'middle' | 'max'
}

export type SizesMap = Record<Required<TagSizesPrps>['kind'], string>

const SizeTypes: SizesMap = {
  normal: 'normal',
  middle: 'middle',
  max: 'max',
}

export interface TagProps {
  closable?: boolean
  isAddBtn?: boolean
  tagSize?: string
  color?: string
  backgroundColor?: string
  borderColor?: string
  icon?: React.ReactNode
  onClosed?: () => void
}

const Tag: React.FC<TagProps> = ({
  children,
  closable = false,
  isAddBtn = false,
  tagSize = SizeTypes.normal,
  color,
  borderColor,
  backgroundColor,
  icon,
  onClosed,
}) => {
  const [visible, setVisible] = useState(true)

  if (visible == false) {
    return null
  }

  return (
    <div
      className={prefixCls}
      id={tagSize}
      style={pickBy(
        {
          backgroundColor: backgroundColor,
          borderColor: borderColor,
          color: color,
          borderStyle: isAddBtn ? 'dashed' : 'solid',
        },
        identity,
      )}
    >
      {icon != null ? { icon } : null}
      {children}
      {closable ? closeTag() : null}
    </div>
  )

  function closeTag() {
    return (
      <button type="button" onClick={closeClick}>
        X
      </button>
    )
  }

  function closeClick() {
    console.log('内部关闭')
    if (onClosed) {
      onClosed!()
    }
    setVisible(false)
  }
}

const checkableTagCls = 'st-checkable-tag'

export interface CheckableTagProps {
  checked: boolean
  onChanged?: (checked: boolean) => void
}

const CheckableTag: React.FC<CheckableTagProps> = ({ children, checked = false, onChanged }) => {
  const [selected, setSelected] = useState(checked)

  if (selected) {
    return (
      <span className={checkableTagCls} onClick={clickAction}>
        <Tag backgroundColor="#095BF9" color="white" borderColor="transparent">
          {children}
        </Tag>
      </span>
    )
  } else {
    return (
      <span className={checkableTagCls} onClick={clickAction}>
        <Tag>{children}</Tag>
      </span>
    )
  }

  function clickAction() {
    const current = !selected
    if (onChanged) {
      onChanged!(current)
    }
    setSelected(current)
  }
}

export { Tag, CheckableTag }
