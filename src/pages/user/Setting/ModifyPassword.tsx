import React from 'react'
import ProCard from '@ant-design/pro-card'
import { Row, Col, Space, Form, Input } from 'antd'
import ProForm, { ProFormText } from '@ant-design/pro-form'
import FormMessage from '@/components/common/FormMessage'

const ModifyPassword = (updateState, handleSubmit) => {
  const { success, msg } = updateState

  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
  }

  return (
    <ProCard title="修改密码" headerBordered>
      <div
        style={{
          margin: 24,
        }}
      >
        <ProForm
          // labelWidth="auto"
          layout={'horizontal'}
          size={'large'}
          {...formItemLayout}
          submitter={{
            render: (props, doms) => {
              return (
                <Row>
                  <Col span={14} offset={4}>
                    <Space>{doms}</Space>
                  </Col>
                </Row>
              )
            },
          }}
          onFinish={async (values) => {
            await handleSubmit(values)
          }}
        >
          {!success && msg && <FormMessage content={msg || '修改失败'} />}
          <Form.Item
            name="passwordOld"
            label="原密码"
            rules={[
              {
                required: true,
                min: 6,
                max: 18,
                message: '密码请输入6-18位字符！',
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="passwordNew"
            label="新密码"
            rules={[
              {
                required: true,
                min: 6,
                max: 18,
                message: '密码请输入6-18位字符！',
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="passwordNew2"
            label="确认密码"
            rules={[
              {
                required: true,
                message: '密码请输入6-18位字符！',
              },

              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('passwordNew') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('新密码与确认密码不一致！'))
                },
              }),
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>
        </ProForm>
      </div>
    </ProCard>
  )
}

export default ModifyPassword
