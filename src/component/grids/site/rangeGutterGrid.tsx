import React from 'react'
import { Row, Col } from '../../..'
import '../style'
import './index.less'

export default () => {
  return (
    <div className="gridDemo-gutter">
      <Row gutter={[4, 20]}>
        <Col span={12}>
          <div className="blue2Div">col-12</div>
        </Col>
        <Col span={12}>
          <div className="blue1Div">col-12</div>
        </Col>
      </Row>

      <Row gutter={[8, 20]}>
        <Col span={8}>
          <div className="blue2Div">col-8</div>
        </Col>
        <Col span={8}>
          <div className="blue1Div">col-8</div>
        </Col>
        <Col span={8}>
          <div className="blue2Div">col-8</div>
        </Col>
      </Row>

      <Row gutter={[16, 20]}>
        <Col span={6}>
          <div className="blue2Div">col-6</div>
        </Col>
        <Col span={6}>
          <div className="blue1Div">col-6</div>
        </Col>
        <Col span={6}>
          <div className="blue2Div">col-6</div>
        </Col>
        <Col span={6}>
          <div className="blue1Div">col-6</div>
        </Col>
      </Row>

      <Row gutter={[24, 20]}>
        <Col span={6}>
          <div className="blue2Div">col-6</div>
        </Col>
        <Col span={6}>
          <div className="blue1Div">col-6</div>
        </Col>
        <Col span={6}>
          <div className="blue2Div">col-6</div>
        </Col>
        <Col span={6}>
          <div className="blue1Div">col-6</div>
        </Col>
      </Row>
    </div>
  )
}
