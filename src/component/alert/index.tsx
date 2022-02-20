import React from 'react'
import types from 'prop-types'

export interface AlertProps {
  kind?: 'info' | 'success' | 'danger' | 'warning'
}

export type KindMap = Record<Required<AlertProps>['kind'], string>

const prefixCls = 'st-alert'

const kinds: KindMap = {
  info: '#095BF920',
  success: '#49C56420',
  danger: '#FF414120',
  warning: '#FFA92720',
}

const Alert: React.FC<AlertProps> = ({ children, kind = 'info', ...rest }) => (
  <div
    className={prefixCls}
    style={{
      background: kinds[kind],
    }}
    {...rest}
  >
    {children}
  </div>
)

Alert.propTypes = {
  kind: types.oneOf(['info', 'success', 'danger', 'warning']),
}

export default Alert
