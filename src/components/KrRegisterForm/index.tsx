import React, { useEffect, useState } from 'react'
import { message, Input, Form, Row, Col, Checkbox, Button } from 'antd'
import { getCaptchaCode } from '@/services/login'
import ProForm, { LoginForm } from '@ant-design/pro-form'

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
}

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
}

const KrRegisterForm = () => {
  const [form] = Form.useForm()

  const [captchaUid, setCaptchaUid] = useState<string>('')
  const [captchaImage, setCaptchaImage] = useState<string>('')
  const [captchaCode, setCaptchaCode] = useState<string>('')
  const [captchaCodeChange, setCaptchaCodeChange] = useState<number>(0)

  const getCaptcha = async () => {
    try {
      const res = await getCaptchaCode()
      // setCaptchaUid(res.data.uid)
      // setCaptchaImage(res.data.image)
      if (res.success) {
        return res.data
      }
    } catch (error) {
      message.error('服务器有误：获取验证码失败')
      return {}
    }
  }

  useEffect(() => {
    getCaptcha().then((res: User.CaptchaCode) => {
      setCaptchaUid(res.uid)
      setCaptchaImage(res.image)
    })
  }, [captchaCodeChange])

  const captchaToggle = () => {
    setCaptchaCodeChange(captchaCodeChange + 1)
  }

  const handleSubmit = async (values: User.RegisterParams) => {
    values['from'] = 'web'
    values['type'] = 'account'
    values['uid'] = captchaUid
  }
  return (
    <>
      <LoginForm
        logo=""
        title="注　册"
        subTitle=" "
        submitter={{
          submitButtonProps: {},
          // 完全自定义整个区域
          render: (props, doms) => {
            return [
              <button
                type="button"
                key="rest"
                onClick={() => props.form?.resetFields()}
              ></button>,
              <button
                type="button"
                key="submit"
                onClick={() => props.form?.submit?.()}
              ></button>,
            ]
          },
        }}
      ></LoginForm>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={async (values) => {
          await handleSubmit(values as User.RegisterParams)
        }}
        initialValues={{
          residence: ['zhejiang', 'hangzhou', 'xihu'],
          prefix: '86',
        }}
        scrollToFirstError
      >
        <Form.Item
          name="username"
          label="账号"
          rules={[
            {
              required: true,
              message: '请输入账号！',
            },
          ]}
        >
          {/* <Input style={{width:'40%'}}/> */}
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="密码"
          rules={[
            {
              required: true,
              message: '请输入密码！',
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="password2"
          label="确认密码"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: '请输入确认密码！',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('密码与确认密码不一致！'))
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="验证码"
          // extra="We must make sure that your are a human."
        >
          <Row gutter={8}>
            <Col span={12}>
              <Form.Item
                name="captchaCode"
                noStyle
                rules={[
                  {
                    required: true,
                    message: '请输入验证码！',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <img
                style={{
                  width: '100%',
                  height: '35px',
                  verticalAlign: 'middle',
                  padding: '0px 0px 0px 0px',
                }}
                src={captchaImage}
                onClick={captchaToggle}
              />
            </Col>
          </Row>
        </Form.Item>

        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(new Error('请勾选接受本网站的协议')),
            },
          ]}
          {...tailFormItemLayout}
        >
          <Checkbox>
            同意本网站的 <a href="">协议</a>
          </Checkbox>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            注册
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default KrRegisterForm
