import React from 'react'
import { Steps } from '../../..'
import '../style'
import './index.less'

const { Step } = Steps

export default () => {
  return (
    <div className="steps">
      <Steps current={1}>
        <Step title="步骤1" />
        <Step title="步骤2" status="finish" />
        <Step title="步骤3" />
        <Step title="步骤4" />
      </Steps>
    </div>
  )
}
