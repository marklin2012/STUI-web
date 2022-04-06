import React from 'react'
import SlickCarousel, { Settings } from './slick'
import classNames from 'classnames'

export type CarouselEffect = 'scrollx' | 'fade'
export type DotPosition = 'top' | 'bottom' | 'left' | 'right'

export interface CarouselProps extends Omit<Settings, 'dots' | 'dotsClass'> {
  effect?: CarouselEffect
  style?: React.CSSProperties
  prefixCls?: string
  slickGoTo?: number
  dotPosition?: DotPosition
  children?: React.ReactNode
  dots?: boolean | { className?: string }
}

export interface CarouselRef {
  goTo: (slide: number, dontAnimate?: boolean) => void
  next: () => void
  prev: () => void
  autoPlay: (palyType?: 'update' | 'leave' | 'blur') => void
  innerSlider: any
}

const Carousel = React.forwardRef<CarouselRef, CarouselProps>(
  (
    { dots = true, arrows = false, draggable = false, dotPosition = 'bottom', ...restProps },
    ref,
  ) => {
    const slickRef = React.useRef<any>()

    const goTo = (slick: number, dontAnimate = false) => {
      slickRef.current.slickGoTo(slick, dontAnimate)
    }

    React.useImperativeHandle(
      ref,
      () => ({
        goTo,
        autoPlay: slickRef.current.innerSlider.autoPlay,
        innerSlider: slickRef.current.innerSlider,
        prev: slickRef.current.slickPrev,
        next: slickRef.current.slickNext,
      }),
      [slickRef.current],
    )

    const prevCount = React.useRef(React.Children.count(restProps.children))

    React.useEffect(() => {
      if (prevCount.current !== React.Children.count(restProps.children)) {
        goTo(restProps.initialSlide || 0, false)
        prevCount.current = React.Children.count(restProps.children)
      }
    }, [restProps.children])

    const newProps = {
      ...restProps,
    }

    if (newProps.effect === 'fade') {
      newProps.fade = true
    }

    const prefixCls = newProps.prefixCls ?? 'st-carousel'
    const dotsClass = 'slick-dots'
    newProps.vertical = dotPosition === 'left' || dotPosition === 'right'

    const enableDots = !!dots
    const dsClass = classNames(
      dotsClass,
      `${dotsClass}-${dotPosition}`,
      typeof dots === 'boolean' ? false : dots?.className,
    )

    const className = classNames(prefixCls, {
      [`${prefixCls}-vertical`]: newProps.vertical,
    })

    return (
      <div className={className}>
        <SlickCarousel
          ref={slickRef}
          {...newProps}
          dots={enableDots}
          dotsClass={dsClass}
          arrows={arrows}
          draggable={draggable}
        />
      </div>
    )
  },
)

export default Carousel
