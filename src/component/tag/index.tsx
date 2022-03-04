import classNames from 'classnames'
import { identity, pickBy } from 'lodash'
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

export interface TagCompounded extends React.FC<TagProps> {
  CheckableTag: typeof CheckableTag
}

const Tag: TagCompounded = (props) => {
  const {
    children,
    closable = false,
    isAddBtn = false,
    tagSize = SizeTypes.normal,
    color,
    borderColor,
    backgroundColor,
    icon,
    onClosed,
  } = props

  const [visible, setVisible] = useState(true)

  if (visible == false) {
    return null
  }

  return (
    <div
      className={classNames(prefixCls, `${prefixCls}-${tagSize}`)}
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
      <button className={'close-button'} type="button" onClick={closeClick}>
        X
      </button>
    )
  }

  function closeClick() {
    if (onClosed) {
      onClosed!()
    }
    setVisible(false)
  }
}

const checkableTagCls = 'st-checkable-tag'

export interface CheckableTagProps {
  checked?: boolean
  onChanged?: (checked: boolean) => void
}

const CheckableTag: React.FC<CheckableTagProps> = ({ children, checked = false, onChanged }) => {
  const [selected, setSelected] = useState(checked)

  return (
    <span className={checkableTagCls} onClick={clickAction}>
      {selected ? (
        <Tag backgroundColor="#095BF9" color="white" borderColor="transparent">
          {children}
        </Tag>
      ) : (
        <Tag>{children}</Tag>
      )}
    </span>
  )

  function clickAction() {
    const current = !selected
    if (onChanged) {
      onChanged!(current)
    }
    setSelected(current)
  }
}

Tag.CheckableTag = CheckableTag

export default Tag
