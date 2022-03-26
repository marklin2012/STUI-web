import React from 'react'
import { Steps, Icon } from '../../..'
import '../style'
import './index.less'

const { Step } = Steps

export default () => {
  return (
    <div className="steps">
      <Steps current={1}>
        <Step title="登录" description="这里是该步骤的描述信息" icon={<Icon icon={'user'} />} />
        <Step
          title="安全"
          description="这里是该步骤的描述信息"
          icon={<Icon icon={'shield'} color={'blue'} />}
        />
        <Step title="编辑" description="这里是该步骤的描述信息" icon={<Icon icon={'edit'} />} />
        <Step title="完成" description="这里是该步骤的描述信息" icon={<Icon icon={'smile'} />} />
      </Steps>
    </div>
  )
}
