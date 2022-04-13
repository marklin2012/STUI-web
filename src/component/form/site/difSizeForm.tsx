import React, { useState } from 'react'
import { Form, Input, Button, DatePicker, Radio, RadioChangeEvent, Select } from '../../..'
import '../style'
import './index.less'

const formItemLayout = { labelCol: { span: 8 }, wrapperCol: { span: 14 } }

type SizeType = Parameters<typeof Form>[0]['size']

function DifSizeForm() {
  const [form] = Form.useForm()
  const [componentSize, setComponentSize] = useState<SizeType>('middle' as SizeType)
  const [sex, setSex] = useState('')
  const [selectValue, setSelectValue] = useState<string | null | undefined>(undefined)

  function sexOnChange(event: RadioChangeEvent) {
    setSex(event.target.value)
  }

  function selectOnChange(value: string) {
    setSelectValue(value)
  }

  function sizeOnChange(event: RadioChangeEvent) {
    setComponentSize(event.target.value)
  }

  function onFormLayoutChange({ size }: { size: SizeType }) {
    setComponentSize(size)
  }

  return (
    <div className="formDemo">
      <Form
        {...formItemLayout}
        form={form}
        size={componentSize}
        initialValues={{ size: componentSize }}
        onValuesChange={onFormLayoutChange}
      >
        <Form.Item label="Form Size" name={'size'}>
          <Radio.Group size={componentSize} value={componentSize}>
            <Radio.Button value="small">Small</Radio.Button>
            <Radio.Button value="middle">Default</Radio.Button>
            <Radio.Button value="large">Large</Radio.Button>
          </Radio.Group>
        </Form.Item>

        <Form.Item label={'Accout'}>
          <Input size={componentSize} placeholder={'Input frank'} />
        </Form.Item>

        <Form.Item label={'Email'} required>
          <Input size={componentSize} placeholder={'Both trigget onBlur and onChange'} />
        </Form.Item>

        <Form.Item label={'Password'} required>
          <Input.Password size={componentSize} placeholder={'Please enter your password'} />
        </Form.Item>

        <Form.Item label={'Gender'} required>
          <Radio.Group size={componentSize} value={sex} onChange={sexOnChange}>
            <Radio value={'male'}>Male</Radio>
            <Radio value={'female'}>Female</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="Select" required>
          <Select
            size={componentSize}
            placeholder="请选择"
            value={selectValue}
            onChange={selectOnChange}
          >
            <Select.Option value="male">Male</Select.Option>
            <Select.Option value="female">Female</Select.Option>
            <Select.Option value="other">Other</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="DatePicker" required>
          <div className="formDemo-datePicker">
            <DatePicker size={componentSize} />
            <DatePicker size={componentSize} />
          </div>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <div className="btnActions">
            <Button type="primary" htmlType="submit" size={componentSize}>
              Submit
            </Button>
            <div className="rowSpace" />
            <Button type="primary" htmlType="reset" size={componentSize}>
              Reset
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  )
}

export default () => <DifSizeForm />
