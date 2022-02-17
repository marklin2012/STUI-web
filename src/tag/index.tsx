import React, { ReactNode } from 'react'

const prefixCls = 'st-tag'

export interface TagTypes {
  kind: 'normal' | 'closed' | 'add'
}

export interface TagSizes {
  size: 'normal' | 'middle' | 'max'
}

export interface TagProps {
  tagType: TagTypes['kind']
  tagSize: TagSizes['size']
  color?: string
  backgroundColor?: string
  icon?: React.ReactNode
  onClosed?: () => void
  onAdded?: () => void
}

const Tag: React.FC<TagProps> = ({
  children,
  tagType = 'normal',
  tagSize = 'normal',
  color,
  backgroundColor,
  icon,
  onClosed,
  onAdded,
  ...rest
}) => (
  <div
    className={prefixCls}
    style={{
      backgroundColor: backgroundColor,
      color: color,
      borderStyle: tagType == 'add' ? 'dotted' : 'solid',
      height: tagSize == 'max' ? 44.0 : tagSize == 'middle' ? 36.0 : 22.0,
    }}
  >
    {icon != null ? IconTag(icon) : tagType == 'add' ? addTag(onAdded) : null}
    {children}
    {tagType == 'closed' ? closeTag(onClosed) : null}
  </div>
)

function IconTag(props: React.ReactNode) {
  return { props }
}

function closeTag(props?: () => void) {
  return (
    <button type="button" onClick={props}>
      x
    </button>
  )
}

function addTag(props?: () => void) {
  return (
    <button className="addTagButton" type="button" onClick={props}>
      +
    </button>
  )
}

export default Tag
