import React from 'react'
import Tooltip, { AbstractTooltipProps, TooltipPlacement } from '../tooltip'
import { getRenderPropValue, RenderFunction } from '../_util/getRenderPropValue'
import './style'

export interface PopoverProps extends AbstractTooltipProps {
  title?: React.ReactNode | RenderFunction
  content?: React.ReactNode | RenderFunction
}

const popPrefixCls = 'st-popover'

const Popover = React.forwardRef<unknown, PopoverProps>(({ title, content, ...restProps }, ref) => {
  const getOverlay = (prefixCls: string) => {
    if (!title && !content) return undefined
    return (
      <>
        {title && <div className={`${prefixCls}-title`}>{getRenderPropValue(title)}</div>}
        <div className={`${prefixCls}-inner-content`}>{getRenderPropValue(content)}</div>
      </>
    )
  }

  return <Tooltip {...restProps} ref={ref as any} overlay={getOverlay(popPrefixCls)} />
})

Popover.displayName = 'Popover'

Popover.defaultProps = {
  placement: 'top' as TooltipPlacement,
  trigger: 'hover',
  mouseEnterDelay: 0.1,
  mouseLeaveDelay: 0.1,
  overlayStyle: {},
}

export default Popover
