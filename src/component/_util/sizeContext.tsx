import React, { FC } from 'react'
import { SizeType } from './type'

const SizeContext = React.createContext<SizeType>(undefined)

export interface SizeContextProps {
  size?: SizeType
}

export const SizeContextProvider: React.FC<SizeContextProps> = ({ children, size }) => (
  <SizeContext.Consumer>
    {(originSize) => (
      <SizeContext.Provider value={size || originSize}>{children}</SizeContext.Provider>
    )}
  </SizeContext.Consumer>
)

export default SizeContext
