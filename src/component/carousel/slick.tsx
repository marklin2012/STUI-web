import React from 'react'
import RcSlick from 'react-slick'
import Icon from '../icon'

export interface ResponsiveObject {
  breakpoint: number
  setting: 'unslick' | Settings
}

export type SwipeDirection = 'left' | 'down' | 'right' | 'top' | string

export type LazyLoadTypes = 'ondemand' | 'progressive'

export interface Settings {
  accessibility?: boolean
  adaptiveHeight?: boolean
  afterChange?(currentSlide: number): void
  appendDots?(dots: React.ReactNode): JSX.Element
  arrows?: boolean
  asNavFor?: SlickCarousel
  autoplaySpeed?: number
  autoplay?: boolean
  beforeChange?(currentSlide: number, nextSlide: number): void
  centerMode?: boolean
  centerPadding?: string
  className?: string
  cssEase?: string
  customPaging?(index: number): JSX.Element
  dotsClass?: string
  dots?: boolean
  draggable?: boolean
  easing?: string
  edgeFriction?: number
  fade?: boolean
  focusOnSelect?: boolean
  infinite?: boolean
  initialSlide?: number
  lazyLoad?: LazyLoadTypes
  nextArrow?: JSX.Element
  onEdge?(swipeDirection: SwipeDirection): void
  onInit?(): void
  onLazyLoad?(slidesToLoad: number[]): void
  onReInit?(): void
  onSwipe?(swipeDirection: SwipeDirection): void
  pauseOnDotsHover?: boolean
  pauseOnFocus?: boolean
  pauseOnHover?: boolean
  prevArrow?: JSX.Element
  responsive?: ResponsiveObject[]
  rows?: number
  rtl?: boolean
  slide?: string
  slidesPerRow?: number
  slidesToScroll?: number
  slidesToShow?: number
  speed?: number
  swipeToSlide?: boolean
  swipe?: boolean
  swipeEvent?(swipeDirection: SwipeDirection): void
  touchMove?: boolean
  touchThreshold?: number
  useCSS?: boolean
  useTransform?: boolean
  variableWidth?: boolean
  vertical?: boolean
  verticalSwiping?: boolean
  waitForAnimate?: boolean
}

class SlickCarousel extends React.Component<Settings, never> {
  constructor(props: Settings) {
    super(props)
  }

  getPrevArrows = () => {
    if (!this.props.arrows) return null
    if (!this.props.prevArrow) {
      return <Icon icon={'angle-left'} />
    }
    return this.props.prevArrow
  }

  getNextArrows = () => {
    if (!this.props.arrows) return null
    if (!this.props.nextArrow) {
      return <Icon icon={'angle-right'} />
    }
    return this.props.nextArrow
  }

  render(): React.ReactNode {
    return (
      <RcSlick
        {...this.props}
        prevArrow={this.getPrevArrows()}
        nextArrow={this.getNextArrows()}
      ></RcSlick>
    )
  }
}

export default SlickCarousel
