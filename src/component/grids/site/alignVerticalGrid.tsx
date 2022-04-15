import React from 'react'
import { Row, Col } from '../../..'
import '../style'
import './index.less'

export default () => {
  return (
    <div className="gridDemo-gutter">
      <Row justify="center" align="top" gutter={[8, 52]}>
        <Col span={8}>
          <div style={{ height: 100, background: '#4585FF' }}>col-8</div>
        </Col>
        <Col span={8}>
          <div style={{ height: 50, background: '#095BF9' }}>col-8</div>
        </Col>
        <Col span={8}>
          <div style={{ height: 100, background: '#4585FF' }}>col-8</div>
        </Col>
      </Row>

      <Row justify="center" align="middle" gutter={[8, 52]}>
        <Col span={8}>
          <div style={{ height: 100, background: '#4585FF' }}>col-8</div>
        </Col>
        <Col span={8}>
          <div style={{ height: 50, background: '#095BF9' }}>col-8</div>
        </Col>
        <Col span={8}>
          <div style={{ height: 100, background: '#4585FF' }}>col-8</div>
        </Col>
      </Row>

      <Row justify="center" align="bottom" gutter={[8, 52]}>
        <Col span={8}>
          <div style={{ height: 100, background: '#4585FF' }}>col-8</div>
        </Col>
        <Col span={8}>
          <div style={{ height: 50, background: '#095BF9' }}>col-8</div>
        </Col>
        <Col span={8}>
          <div style={{ height: 100, background: '#4585FF' }}>col-8</div>
        </Col>
      </Row>
    </div>
  )
}
