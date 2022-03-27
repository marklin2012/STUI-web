import React from 'react'
import { Steps, Icon, StepsStatus } from '../../..'
import '../style'
import './index.less'

const { Step } = Steps

export default () => {
  const progressRender1 = (dot: any, info: { index: number; status: StepsStatus }) => {
    let render
    if (info.status === 'finish') {
      render = <Icon icon={'smile'} />
    } else if (info.status === 'process') {
      render = <Icon icon={'check-circle'} />
    } else {
      render = <span>{info.index + 1}</span>
    }
    return <div className="customDot1">{render}</div>
  }

  const progressRender2 = (dot: any, info: { index: number }) => {
    let render = <span>{info.index + 1}</span>
    return <div className="customDot2">{render}</div>
  }

  return (
    <div className="steps">
      <Steps current={1} progressDot={progressRender1}>
        <Step title="已完成" />
        <Step title="进行中" />
        <Step title="待进行" />
        <Step title="待进行" />
      </Steps>
      <div className="columnSpace" />
      <Steps current={1} progressDot={progressRender2}>
        <Step title="已完成" description="这里是该步骤的描述信息" />
        <Step title="进行中" description="这里是该步骤的描述信息" />
        <Step title="待进行" description="这里是该步骤的描述信息" />
        <Step title="待进行" description="这里是该步骤的描述信息" />
      </Steps>
    </div>
  )
}
