import React, { useState } from 'react'
import {
  Form,
  Input,
  Button,
  DatePicker,
  Radio,
  RadioChangeEvent,
  Select,
  Checkbox,
  CheckboxValueType,
} from '../../..'
import '../style'
import './index.less'

const formItemLayout = { labelCol: { span: 8 }, wrapperCol: { span: 14 } }

function CombineForm() {
  const [form] = Form.useForm()
  const [sex, setSex] = useState('')

  function sexOnChange(event: RadioChangeEvent) {
    setSex(event.target.value)
  }

  return (
    <div className="formDemo">
      <Form {...formItemLayout} form={form}>
        <Form.Item label={'Accout'}>
          <Input placeholder={'Input frank'} />
        </Form.Item>

        <Form.Item label={'Email'} required>
          <Input placeholder={'Both trigget onBlur and onChange'} />
        </Form.Item>

        <Form.Item label={'Password'} required>
          <Input.Password placeholder={'Please enter your password'} />
        </Form.Item>

        <Form.Item label={'Gender'} required>
          <Radio.Group value={sex} onChange={sexOnChange}>
            <Radio value={'male'}>Male</Radio>
            <Radio value={'female'}>Female</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label={'Remarks'} required>
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

function OtherCombineForm() {
  const [form] = Form.useForm()
  const [selectValue, setSelectValue] = useState<string | null | undefined>(undefined)
  const [checkboxValue, setCheckboxValue] = useState<CheckboxValueType[]>([''])
  const [radioValue, setRadioValue] = useState('')

  function selectOnChange(value: string) {
    setSelectValue(value)
  }

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

  return (
    <div className="formDemo">
      <Form {...formItemLayout} form={form}>
        <Form.Item label={'Accout'}>
          <Input placeholder={'Input frank'} />
        </Form.Item>

        <Form.Item label={'NumberPicker'} labelCol={{ span: 8 }} wrapperCol={{ span: 4 }}>
          <Input defaultValue={'1'} />
        </Form.Item>

        <Form.Item label="Select" required>
          <Select placeholder="请选择" value={selectValue} onChange={selectOnChange}>
            <Select.Option value="male">Male</Select.Option>
            <Select.Option value="female">Female</Select.Option>
            <Select.Option value="other">Other</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="DatePicker" required>
          <div className="formDemo-datePicker">
            <DatePicker />
            <DatePicker />
          </div>
        </Form.Item>

        <Form.Item label="RangePicker" required>
          <DatePicker.RangePicker />
        </Form.Item>

        <Form.Item label={'Checkbox'} required>
          <Checkbox.Group
            defaultValue={checkboxValue}
            options={options}
            onChange={checkboxOnChange}
          />
        </Form.Item>

        <Form.Item label={'Radio'} required>
          <Radio.Group value={radioValue} onChange={radioOnChange}>
            <Radio value={'apple'}>Apple</Radio>
            <Radio value={'banana'}>Banana</Radio>
            <Radio value={'cherry'} disabled>
              cherry
            </Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label={'Remarks'} required>
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

export default () => {
  return (
    <div>
      <CombineForm />
      <div className="formDemo-columnSpace" />
      <OtherCombineForm />
    </div>
  )
}
