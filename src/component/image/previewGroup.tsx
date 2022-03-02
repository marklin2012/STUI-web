import React from 'react'
import RcImage from 'rc-image'
import Icon from '../icon'
import { GroupConsumerProps } from 'rc-image/lib/PreviewGroup'
import { getTransitionName } from '../_util/motion'

export const icons = {
  rotateLeft: <Icon icon={'rotate-left'} />,
  rotateRight: <Icon icon={'rotate-right'} />,
  zoomIn: <Icon icon={'magnifying-glass-plus'} />,
  zoomOut: <Icon icon={'magnifying-glass-minus'} />,
  close: <Icon icon={'xmark'} />,
  left: <Icon icon={'angle-left'} />,
  right: <Icon icon={'angle-right'} />,
}

const prePrefixCls = 'st-image-preview'

const InternalPreviewGroup: React.FC<GroupConsumerProps> = ({
  previewPrefixCls: customizePrefixCls,
  preview,
  ...restProps
}) => {
  const prefixCls = customizePrefixCls ?? prePrefixCls
  const mergedPreview = React.useMemo(() => {
    if (preview === false) return preview
    const _preview = typeof preview === 'object' ? preview : {}
    return {
      ..._preview,
      transitionName: getTransitionName(prefixCls, 'zoom', _preview.transitionName),
      maskTransitionName: getTransitionName(prefixCls, 'fade', _preview.maskTransitionName),
    }
  }, [preview])
  return (
    <RcImage.PreviewGroup
      preview={mergedPreview}
      previewPrefixCls={prefixCls}
      icons={icons}
      {...restProps}
    ></RcImage.PreviewGroup>
  )
}

export default InternalPreviewGroup
