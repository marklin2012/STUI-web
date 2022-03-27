import React from 'react'
import { Steps } from '../../..'
import '../style'
import './index.less'

const { Step } = Steps

export default () => {
  return (
    <div className="steps">
      <Steps current={1} progressDot>
        <Step title="已完成" description="这里是该步骤的描述信息" />
        <Step title="进行中" description="这里是该步骤的描述信息" />
        <Step title="待进行" description="这里是该步骤的描述信息" />
        <Step title="待进行" description="这里是该步骤的描述信息" />
      </Steps>
      <div className="columnSpace" />
      <Steps current={1} progressDot direction="vertical">
        <Step title="已完成" description="这里是该步骤的描述信息" />
        <Step title="进行中" description="这里是该步骤的描述信息" />
        <Step title="待进行" description="这里是该步骤的描述信息" />
        <Step title="待进行" description="这里是该步骤的描述信息" />
      </Steps>
    </div>
  )
}
