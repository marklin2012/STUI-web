import React from 'react'
import RcImage, { ImageProps } from 'rc-image'
import PreviewGroup, { icons } from './previewGroup'
import Icon from '../icon'
import { getTransitionName } from '../_util/motion'
import './style'

export interface CompositionImage<P> extends React.FC<P> {
  PreviewGroup: typeof PreviewGroup
}

export interface STImageProps extends ImageProps {
  previewString?: string
}

const imgPrefixCls = 'st-image'

const Image: CompositionImage<STImageProps> = ({
  prefixCls: customizePrefixCls,
  preview,
  previewString = '预览',
  ...restProps
}) => {
  const prefixCls = customizePrefixCls ?? imgPrefixCls

  const mergedPreview = React.useMemo(() => {
    if (preview === false) return preview
    const _preview = typeof preview === 'object' ? preview : {}

    return {
      mask: (
        <div className={`${prefixCls}-mask-info`}>
          <Icon icon={'eye'} size={'sm'} />
          <span style={{ color: 'white', fontSize: 12, marginLeft: 4 }}>{previewString}</span>
        </div>
      ),
      icons,
      ..._preview,
      transitionName: getTransitionName(prefixCls, 'zoom', _preview.transitionName),
      maskTransitionName: getTransitionName(prefixCls, 'fade', _preview.maskTransitionName),
    }
  }, [preview])

  return <RcImage prefixCls={prefixCls} preview={mergedPreview} {...restProps} />
}

Image.PreviewGroup = PreviewGroup

export default Image
