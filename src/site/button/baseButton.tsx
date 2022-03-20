import React from 'react'
import { Button, Icon } from '../..'
import './index.less'
import '../../component/button/style'

export default () => {
  return (
    <div className="button">
      <div className="flex">
        <Button type="primary">Solid Button</Button>
        <div className="rowSpace" />
        <Button>Stroke Button</Button>
        <div className="rowSpace" />
        <Button type="dashed">Dashed Button</Button>
      </div>
      <br />
      <div className="flex">
        <Button type="text">Text Button</Button>
        <div className="rowSpace" />
        <Button type="link">Link Button</Button>
        <div className="rowSpace" />
        <Button type="primary" icon={<Icon icon={'star'} />}>
          Solid Button
        </Button>
        <div className="rowSpace" />
        <Button type="primary" shape="circle" icon={<Icon icon={'star'} />} />
      </div>
    </div>
  )
}
