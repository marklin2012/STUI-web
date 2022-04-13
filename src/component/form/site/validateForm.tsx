import moment from 'moment'
import React, { useState } from 'react'
import {
  Form,
  Input,
  Button,
  DatePicker,
  Radio,
  RadioChangeEvent,
  Checkbox,
  CheckboxValueType,
} from '../../..'
import '../style'
import './index.less'

const formItemLayout = { labelCol: { span: 8 }, wrapperCol: { span: 14 } }

function ValidateForm() {
  const [form] = Form.useForm()

  const [checkboxValue, setCheckboxValue] = useState<CheckboxValueType[]>(['option2'])
  const [radioValue, setRadioValue] = useState('')

  const options = [
    { label: 'option1', value: 'option1' },
    { label: 'option2', value: 'option2' },
    { label: 'option3', value: 'option3', disabled: true },
  ]

  function checkboxOnChange(checkedValues: CheckboxValueType[]) {
    setCheckboxValue(checkedValues)
  }

  function radioOnChange(event: RadioChangeEvent) {
    setRadioValue(event.target.value)
  }

  const onFinish = (values: any) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div className="formDemo">
      <Form {...formItemLayout} form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Form.Item
          label={'Accout'}
          name={'account'}
          rules={[
            {
              required: true,
              message: '长度在4到5个字符',
            },
          ]}
        >
          <Input placeholder={'Input frank'} />
        </Form.Item>

        <Form.Item
          label={'Email'}
          name={'email'}
          required
          rules={[{ required: true, message: 'Email 是必填字段' }]}
        >
          <Input placeholder={'Both trigget onBlur and onChange'} />
        </Form.Item>

        <Form.Item
          label={'Password'}
          name={'password'}
          required
          rules={[
            {
              required: true,
              message: '密码输入错误',
            },
          ]}
        >
          <Input.Password placeholder={'Please enter your password'} />
        </Form.Item>

        <Form.Item label="RangePicker" required>
          <DatePicker.RangePicker defaultValue={[moment(), moment().add(7, 'day')]} />
        </Form.Item>

        <Form.Item label={'Checkbox'} required>
          <Checkbox.Group
            defaultValue={checkboxValue}
            options={options}
            onChange={checkboxOnChange}
          />
        </Form.Item>

        <Form.Item
          label={'Radio'}
          name={'radio'}
          required
          rules={[
            {
              required: true,
              message: '请选择radio',
            },
          ]}
        >
          <Radio.Group value={radioValue} onChange={radioOnChange}>
            <Radio value={'apple'}>Apple</Radio>
            <Radio value={'banana'}>Banana</Radio>
            <Radio value={'cherry'} disabled>
              cherry
            </Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label={'Remarks'}
          name={'remarks'}
          required
          rules={[
            {
              required: true,
              message: '请填写Remarks',
            },
          ]}
        >
          <Input.TextArea placeholder={'Everything is ok!'} maxLength={20} showCount />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <div className="btnActions">
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <div className="rowSpace" />
            <Button type="primary" htmlType="reset">
              Reset
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  )
}

export default () => <ValidateForm />
