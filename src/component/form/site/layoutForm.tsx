import React, { useState } from 'react'
import { Form, Input, Button, Radio } from '../../..'
import '../style'
import './index.less'

type LayoutType = Parameters<typeof Form>[0]['layout']

function LayoutForm() {
  const [form] = Form.useForm()
  const [formLayout, setFormLayout] = useState<LayoutType>('horizontal')

  function onFormLayoutChange({ layout }: { layout: LayoutType }) {
    setFormLayout(layout)
  }

  const formItemLayout =
    formLayout === 'horizontal' ? { labelCol: { span: 4 }, wrapperCol: { span: 14 } } : null

  const buttonItemLayout =
    formLayout === 'horizontal' ? { wrapperCol: { span: 14, offset: 4 } } : null

  return (
    <div className="formDemo">
      <Form
        {...formItemLayout}
        form={form}
        layout={formLayout}
        initialValues={{ layout: formLayout }}
        onValuesChange={onFormLayoutChange}
      >
        <Form.Item label={'Form Layout'} name={'layout'}>
          <Radio.Group value={formLayout}>
            <Radio.Button value={'horizontal'}>Horizontal</Radio.Button>
            <Radio.Button value={'vertical'}>Vertical</Radio.Button>
            <Radio.Button value={'inline'}>Inline</Radio.Button>
          </Radio.Group>
        </Form.Item>

        <Form.Item label={'Username'}>
          <Input placeholder={'First'} />
        </Form.Item>

        <Form.Item label={'Password'}>
          <Input placeholder={'Please enter your password'} />
        </Form.Item>

        <Form.Item {...buttonItemLayout}>
          <Button type={'primary'}>Submit</Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default () => <LayoutForm />
