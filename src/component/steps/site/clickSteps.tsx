import React, { useState } from 'react'
import { Steps, Button } from '../../..'
import '../style'
import './index.less'

const { Step } = Steps

function ClickSteps() {
  const steps = [
    { title: '步骤1', description: '这里是步骤1的描述信息' },
    { title: '步骤2', description: '这里是步骤2的描述信息' },
    { title: '步骤3', description: '这里是步骤3的描述信息' },
    { title: '步骤4', description: '这里是步骤4的描述信息' },
  ]

  const [current, setCurrent] = useState(0)

  function onChange(newCur: number) {
    setCurrent(newCur)
  }

  return (
    <div className="steps">
      <Steps current={current} onChange={onChange}>
        {steps.map((step) => (
          <Step key={step.title} title={step.title} description={step.description} />
        ))}
      </Steps>
    </div>
  )
}

export default () => <ClickSteps />
