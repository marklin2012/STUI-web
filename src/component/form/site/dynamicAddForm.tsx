import React from 'react'
import { Form, Input, Button, Row, Icon } from '../../..'
import { prefixClsIcon } from '../../_util/prefixClsIcon'
import '../style'
import './index.less'

export default () => {
  const onFinish = (values: any) => {
    console.log('Received values of form:', values)
  }

  return (
    <div className="formDemo">
      <Form
        name={'dynamic_form_item'}
        autoComplete={'off'}
        onFinish={onFinish}
        wrapperCol={{ span: 20, offset: 4 }}
      >
        <Form.List name="users">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Form.Item
                  label={'Username'}
                  name={[name, 'username']}
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                  required
                >
                  <Form.Item {...restField} rules={[{ required: true, message: '请输入Username' }]}>
                    <Input placeholder="Username" style={{ width: 'calc(100% - 42px)' }} />
                    {prefixClsIcon(
                      <Icon icon={'minus-circle'} onClick={() => remove(name)} />,
                      'dynamicDeleteBtn',
                    )}
                  </Form.Item>
                </Form.Item>
              ))}
              <Form.Item wrapperCol={{ offset: 8, span: 14 }}>
                <Button onClick={() => add()} block icon={<Icon icon={'plus'} />}>
                  Add field
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

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
