import React from 'react'

import { UploadProps } from './interface'
import Upload from './upload'

export type DraggerProps = UploadProps & { height?: number }

const InternalDragger: React.ForwardRefRenderFunction<unknown, DraggerProps> = (
  { style, height, ...restProps },
  ref,
) => {
  return <Upload ref={ref} {...restProps} type={'drag'} style={{ ...style, height }} />
}

const Dragger = React.forwardRef(InternalDragger) as React.FC<DraggerProps>

Dragger.displayName = 'Dragger'

export default Dragger
