import React from 'react'
import { Form, Input, Button, Checkbox } from '../../..'
import '../style'
import './index.less'

export default () => {
  return (
    <div className="formDemo">
      <Form
        name={'basic'}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        autoComplete={'off'}
      >
        <Form.Item
          label={'Username'}
          name={'username'}
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
          <Checkbox>Remember me</Checkbox>
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
