import React from 'react'
import { Row, Col } from '../../..'
import '../style'
import './index.less'

export default () => {
  return (
    <div className="gridDemo">
      <Row>
        <Col span={24}>Col-24 Col-offset-0</Col>
      </Row>

      <Row>
        <Col span={12} offset={12}>
          Col-12 Col-offset-12
        </Col>
      </Row>

      <Row>
        <Col span={8}>Col-8</Col>
        <Col span={8} offset={8}>
          Col-8
        </Col>
      </Row>

      <Row>
        <Col span={6} offset={6}>
          col-6 col-offset-6
        </Col>
        <Col span={6} offset={6}>
          col-6 col-offset-6
        </Col>
      </Row>
    </div>
  )
}
