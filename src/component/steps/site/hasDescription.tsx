import React from 'react'
import { Steps } from '../../..'
import '../style'
import './index.less'

const { Step } = Steps

export default () => {
  return (
    <div className="steps">
      <Steps current={1}>
        <Step title="步骤1" description="这里是该步骤的描述信息" />
        <Step title="步骤2" description="这里是该步骤的描述信息" />
        <Step title="步骤3" description="这里是该步骤的描述信息" />
        <Step title="步骤4" description="这里是该步骤的描述信息" />
      </Steps>
    </div>
  )
}
