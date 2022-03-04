import React from 'react'
import { Card, Icon } from '../..'
import Meta from '../../component/card/meta'
import { defaultCardContent } from './defaultContent'
import './index.less'

export default () => {
  return (
    <div className="card">
      <Card style={{ width: 300 }} bordered={false}>
        {defaultCardContent()}
      </Card>
    </div>
  )
}
