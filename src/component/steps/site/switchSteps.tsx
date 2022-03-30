import React, { useState } from 'react'
import { Steps, Button } from '../../..'
import '../style'
import './index.less'

const { Step } = Steps

function SwitchSteps() {
  const steps = [
    { title: '步骤1', content: '步骤1文字内容' },
    { title: '步骤2', content: '步骤2文字内容' },
    { title: '步骤3', content: '步骤3文字内容' },
    { title: '步骤4', content: '步骤4文字内容' },
  ]

  const [current, setCurrent] = useState(0)

  function prevClick() {
    setCurrent(current - 1)
  }

  function nextClick() {
    setCurrent(current + 1)
  }

  return (
    <div className="steps">
      <Steps current={current}>
        {steps.map((step) => (
          <Step key={step.title} title={step.title} />
        ))}
      </Steps>
      <div className="steps-content">{steps[current].content}</div>
      <div className="steps-action">
        {current < steps.length - 1 && (
          <Button type="primary" onClick={nextClick}>
            下一步
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={() => console.log('完成')}>
            完成
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: '0 8px' }} onClick={prevClick}>
            上一步
          </Button>
        )}
      </div>
    </div>
  )
}

export default () => <SwitchSteps />
