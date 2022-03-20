import React from 'react'
import { Button, Icon } from '../..'
import './index.less'
import '../../component/button/style'

export default () => {
  return (
    <div className="button">
      <div className="flex">
        <Button type="primary">方形按钮</Button>
        <div className="rowSpace" />
        <Button>方形按钮</Button>
        <div className="rowSpace" />
        <Button type="dashed">方形按钮</Button>
      </div>
      <br />
      <div className="flex">
        <Button type="primary" shape="round">
          圆形按钮
        </Button>
        <div className="rowSpace" />
        <Button shape="round">圆形按钮</Button>
        <div className="rowSpace" />
        <Button type="dashed" shape="round">
          圆形按钮
        </Button>
      </div>
    </div>
  )
}
