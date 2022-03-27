import React, { useState } from 'react'
import { Steps } from '../../..'
import '../style'
import './index.less'

const { Step } = Steps

function NavSteps() {
  const [current, setCurrent] = useState(0)

  function onChange(newCur: number) {
    setCurrent(newCur)
  }

  return (
    <div className="steps">
      <Steps current={current} type="navigation" onChange={onChange} className="navigation">
        <Step title="已完成" description="这里是该步骤的描述信息" />
        <Step title="进行中" subTitle="00:08" description="这里是该步骤的描述信息" />
        <Step title="待进行" description="这里是该步骤的描述信息" />
      </Steps>

      <Steps current={current} type="navigation" onChange={onChange} className="navigation">
        <Step title="步骤1" />
        <Step title="步骤2" status="finish" />
        <Step title="步骤3" />
        <Step title="步骤4" />
      </Steps>
    </div>
  )
}
export default () => <NavSteps />
