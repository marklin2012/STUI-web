import React from 'react'
import Icon from '../icon'

export default function getSelectIcons({
  suffixIcon,
  clearIcon,
  menuItemSelectedIcon,
  removeIcon,
  loading,
  multiple,
  prefixCls,
}: {
  suffixIcon?: React.ReactNode
  clearIcon?: React.ReactNode
  menuItemSelectedIcon?: React.ReactNode
  removeIcon?: React.ReactNode
  loading?: boolean
  multiple?: boolean
  prefixCls: string
}) {
  let mergedClearIcon = clearIcon
  if (!clearIcon) {
    mergedClearIcon = <Icon icon={'circle-xmark'} color={'#C4C5C7'} />
  }

  let mergedSuffixIcon = null
  if (suffixIcon !== undefined) {
    mergedSuffixIcon = suffixIcon
  } else if (loading) {
    mergedSuffixIcon = <Icon icon={'ramp-loading'} color={'#C4C5C7'} />
  } else {
    const iconCls = `${prefixCls}-suffix`
    mergedSuffixIcon = ({ open, showSearch }: { open: Boolean; showSearch: Boolean }) => {
      if (open && showSearch) {
        return <Icon icon={'magnifying-glass'} color={'#C4C5C7'} className={iconCls} />
      }
      return <Icon icon={'angle-down'} color={'#C4C5C7'} className={iconCls} />
    }
  }

  // Checked item icon
  let mergedItemIcon = null
  if (menuItemSelectedIcon !== undefined) {
    mergedItemIcon = menuItemSelectedIcon
  } else if (multiple) {
    mergedItemIcon = <Icon icon={'check'} color={'#1070FF'} />
  } else {
    mergedItemIcon = null
  }

  let mergedRemoveIcon = null
  if (removeIcon !== undefined) {
    mergedRemoveIcon = removeIcon
  } else {
    mergedRemoveIcon = <Icon icon={'xmark'} color={'#C4C5C7'} />
  }

  return {
    clearIcon: mergedClearIcon,
    suffixIcon: mergedSuffixIcon,
    itemIcon: mergedItemIcon,
    removeIcon: mergedRemoveIcon,
  }
}
