import React from 'react'
import classNames from 'classnames'
import RowContext from './rowContext'
import { tuple } from '../_util/type'
import ResponsiveObserve, {
  Breakpoint,
  ScreenMap,
  responsiveArray,
} from '../_util/responsiveObserver'
import useFlexGapSupport from '../_util/hooks/useFlexGapSupported'

const RowAligns = tuple('top', 'middle', 'bottom', 'stretch')
const RowJustify = tuple('start', 'end', 'center', 'space-around', 'space-between')

export type Gutter = number | Partial<Record<Breakpoint, number>>
export interface RowProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  gutter?: Gutter | [Gutter, Gutter]
  align?: typeof RowAligns[number]
  justify?: typeof RowJustify[number]
  prefixCls?: string
  wrap?: boolean
}

const Row = React.forwardRef<HTMLDivElement, RowProps>((props, ref) => {
  const {
    prefixCls: customPrefixCls,
    justify,
    align,
    className,
    style,
    children,
    gutter = 0,
    wrap,
    ...restProps
  } = props

  const [screens, setScreens] = React.useState<ScreenMap>({
    xs: true,
    sm: true,
    md: true,
    lg: true,
    xl: true,
    xxl: true,
  })

  const supportFlexGap = useFlexGapSupport()

  const gutterRef = React.useRef<Gutter | [Gutter, Gutter]>(gutter)

  React.useEffect(() => {
    const token = ResponsiveObserve.subscribe((screen) => {
      const currentGutter = gutterRef.current || 0
      if (
        (!Array.isArray(currentGutter) && typeof currentGutter === 'object') ||
        (Array.isArray(currentGutter) &&
          (typeof currentGutter[0] === 'object' || typeof currentGutter[1] === 'object'))
      ) {
        setScreens(screen)
      }
    })
    return () => ResponsiveObserve.unsubscribe(token)
  }, [])

  const getGutter = (): [number, number] => {
    const results: [number, number] = [0, 0]
    const normalizedGutter = Array.isArray(gutter) ? gutter : [gutter, 0]
    normalizedGutter.forEach((g, index) => {
      if (typeof g === 'object') {
        for (let i = 0; i < responsiveArray.length; i++) {
          const breakpoint: Breakpoint = responsiveArray[i]
          if (screens[breakpoint] && g[breakpoint] !== undefined) {
            results[index] = g[breakpoint] as number
            break
          }
        }
      } else {
        results[index] = g || 0
      }
    })
    return results
  }

  const prefixCls = customPrefixCls ?? 'st-row'
  const gutters = getGutter()
  const classes = classNames(
    prefixCls,
    {
      [`${prefixCls}-no-wrap`]: wrap === false,
      [`${prefixCls}-${justify}`]: justify,
      [`${prefixCls}-${align}`]: align,
    },
    className,
  )

  const rowStyle: React.CSSProperties = {}
  const horizontalGutter = gutters[0] > 0 ? gutters[0] / -2 : undefined
  const verticalGutter = gutters[1] > 0 ? gutters[1] / -2 : undefined

  if (horizontalGutter) {
    rowStyle.marginLeft = horizontalGutter
    rowStyle.marginRight = horizontalGutter
  }

  if (supportFlexGap) {
    // Set gap direct if flex gap support
    ;[, rowStyle.rowGap] = gutters
  } else if (verticalGutter) {
    rowStyle.marginTop = verticalGutter
    rowStyle.marginBottom = verticalGutter
  }

  const [gutterH, gutterV] = gutters
  const rowContext = React.useMemo(
    () => ({ gutter: [gutterH, gutterV] as [number, number], wrap, supportFlexGap }),
    [gutterH, gutterV, wrap, supportFlexGap],
  )

  return (
    <RowContext.Provider value={rowContext}>
      <div {...restProps} className={classes} style={{ ...rowStyle, ...style }} ref={ref}>
        {children}
      </div>
    </RowContext.Provider>
  )
})

Row.displayName = 'Row'

export default Row
