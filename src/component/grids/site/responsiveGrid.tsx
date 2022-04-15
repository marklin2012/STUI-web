import React from 'react'
import { Row, Col } from '../../..'
import '../style'
import './index.less'

export default () => {
  return (
    <>
      <div className="gridDemo">
        <Row gutter={[0, 20]}>
          <Col span={8}>Col</Col>
          <Col span={16}>Col</Col>
        </Row>

        <Row gutter={[0, 20]}>
          <Col span={12}>Col</Col>
          <Col span={2}>Col</Col>
          <Col span={10}>Col</Col>
        </Row>

        <Row gutter={[0, 20]}>
          <Col span={2}>Col</Col>
          <Col span={7}>Col</Col>
          <Col span={7}>Col</Col>
          <Col span={8}>Col</Col>
        </Row>
      </div>

      <div className="gridDemo-gutter">
        <Row gutter={16}>
          <Col span={8}>
            <div className="blue2Div">Col</div>
          </Col>
          <Col span={4}>
            <div className="blue1Div">Col</div>
          </Col>
          <Col span={8}>
            <div className="blue2Div">Col</div>
          </Col>
          <Col span={4}>
            <div className="blue1Div">Col</div>
          </Col>
        </Row>
      </div>
    </>
  )
}
