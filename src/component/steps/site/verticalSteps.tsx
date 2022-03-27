import React from 'react'
import { Steps } from '../../..'
import '../style'
import './index.less'

const { Step } = Steps

export default () => {
  const steps = [
    { title: '步骤1', description: '这里是步骤1的描述信息' },
    { title: '步骤2', description: '这里是步骤2的描述信息' },
    { title: '步骤3', description: '这里是步骤3的描述信息' },
    { title: '步骤4', description: '这里是步骤4的描述信息' },
  ]
  return (
    <div className="steps">
      <Steps current={1} direction="vertical">
        {steps.map((step) => (
          <Step key={step.title} title={step.title} description={step.description} />
        ))}
      </Steps>
    </div>
  )
}
