import React from 'react'
import { Row, Col } from '../../..'
import '../style'
import './index.less'

export default () => {
  return (
    <div className="gridDemo">
      <Row>
        <Col xs={2}>Col</Col>
        <Col xs={20}>Col</Col>
        <Col xs={2}>Col </Col>
      </Row>
    </div>
  )
}
