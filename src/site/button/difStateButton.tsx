import React from 'react'
import { Button, Icon } from '../..'
import './index.less'
import '../../component/button/style'

export default () => {
  return (
    <div className="button">
      <div className="flex">
        <Button type="primary">默认状态</Button>
        <div className="rowSpace" />
        <Button type="primary" loading={true}>
          加载中
        </Button>
        <div className="rowSpace" />
        <Button type="primary" disabled={true}>
          禁用状态
        </Button>
      </div>
      <br />
      <div className="flex">
        <Button type="primary" danger>
          危险状态
        </Button>
        <div className="rowSpace" />
        <Button type="primary" success>
          成功状态
        </Button>
      </div>
      <br />
      <Button type="primary" block>
        适应父视图宽度
      </Button>
    </div>
  )
}
