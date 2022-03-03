import * as React from 'react'
import { ScreenSizeMap } from '../_util/responsiveObserver'

export type AvatarSize = 'default' | 'large' | 'small' | number | ScreenSizeMap

const SizeContext = React.createContext<AvatarSize>('default')

export interface SizeContextProps {
  size?: AvatarSize
}

export const SizeContextProvider: React.FC<SizeContextProps> = ({ children, size }) => {
  return (
    <SizeContext.Consumer>
      {(originSize) => (
        <SizeContext.Provider value={size || originSize}>{children}</SizeContext.Provider>
      )}
    </SizeContext.Consumer>
  )
}

export default SizeContext
