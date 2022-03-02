import { useEffect, useRef } from 'react'
import ResponsiveObserve, { ScreenMap } from '../responsiveObserver'
import useForceUpdate from './useForceUpdate'

function userBreakpoint(refreshOnChange: boolean = true): ScreenMap {
  const screenRef = useRef<ScreenMap>({})
  const forceUpdate = useForceUpdate()

  useEffect(() => {
    const token = ResponsiveObserve.subscribe((supportScreens) => {
      screenRef.current = supportScreens
      if (refreshOnChange) {
        forceUpdate()
      }
    })

    return () => ResponsiveObserve.unsubscribe(token)
  }, [])

  return screenRef.current
}

export default userBreakpoint
