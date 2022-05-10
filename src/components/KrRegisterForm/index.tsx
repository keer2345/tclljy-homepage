import React, { useEffect, useState } from 'react'
import {
  Alert,
  message,
  Input,
  Form,
  Row,
  Col,
  Checkbox,
  Button,
  Typography,
} from 'antd'
import { getCaptchaCode, getUserInfo, register } from '@/services/user'

import { history } from 'umi'
const { Title } = Typography
const formItemLayout = {
  labelCol: {
    xs: { span: 22, offset: 0 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 22, offset: 0 },
    sm: { span: 8 },
  },
}

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 22,
      offset: 8,
    },
    sm: {
      span: 22,
      offset: 12,
    },
  },
}

const RegisterMessage: React.FC<{ content: string }> = ({ content }) => (
  <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
)

const KrRegisterForm = () => {
  const [form] = Form.useForm()

  const [captchaUid, setCaptchaUid] = useState<string>('')
  const [captchaImage, setCaptchaImage] = useState<string>('')
  const [captchaCodeChange, setCaptchaCodeChange] = useState<number>(0)

  const [registerState, setRegisterState] = useState<API.RespResult>({})

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
    try {
      values['from'] = 'web'
      values['type'] = 'account'
      values['uid'] = captchaUid

      const res = await register({ ...values })

      if (res.success && res.data) {
        localStorage.setItem(res.data.tokenName, res.data.tokenValue)
        localStorage.setItem('userid', res.data.loginId)
        message.success('注册成功!')

        setRegisterState({})

        const resp = await getUserInfo()
        const userInfo: User.UserInfo = resp.data
        localStorage.setItem('userInfo', JSON.stringify(userInfo))

        if (!history) return
        const { query } = history.location
        const { redirect } = query as { redirect: string }

        // const jumpPath = localStorage.getItem('jumpPath')
        // localStorage.removeItem('jumpPath')
        // if (jumpPath) {
        //   history.push(jumpPath)
        // } else {
        //   history.push(redirect || '/')
        // }

        history.push(redirect || '/user/setting')
        return
      }
    } catch (error) {
      message.error(error.data.msg)
      setRegisterState(error.data)
    }
  }

  const { success, msg } = registerState

  return (
    <>
      <Row>
        <Col>&nbsp;</Col>
      </Row>
      <Row justify="center">
        <Col>
          <Typography>
            <Title>注　册</Title>
          </Typography>
        </Col>
      </Row>
      {!success && msg && (
        <Row justify="center">
          <Col
            xs={{ span: 0.5 }}
            sm={{ span: 4 }}
            md={{ span: 6 }}
            lg={{ span: 8 }}
            xl={{ span: 9 }}
          ></Col>
          <Col
            xs={{ span: 23 }}
            sm={{ span: 16 }}
            md={{ span: 12 }}
            lg={{ span: 8 }}
            xl={{ span: 6 }}
          >
            <RegisterMessage content={msg || '注册失败'} />
          </Col>
          <Col
            xs={{ span: 0.5 }}
            sm={{ span: 4 }}
            md={{ span: 6 }}
            lg={{ span: 8 }}
            xl={{ span: 9 }}
          ></Col>
        </Row>
      )}
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={async (values) => {
          await handleSubmit(values as User.RegisterParams)
        }}
        initialValues={{
          agreement: true,
        }}
        size={'large'}
        scrollToFirstError
      >
        <Form.Item
          name="username"
          label="账号"
          rules={[
            {
              min: 5,
              max: 18,
              message: '账号须在 5 - 18 位之间',
            },
            {
              required: true,
              pattern: /^[A-Za-z]\w+$/,
              message: '账号须以字母开头，并只能包含字母、数字、下划线',
            },
          ]}
        >
          {/* <Input style={{width:'40%'}}/> */}
          <Input min={5} max={18} />
        </Form.Item>

        <Form.Item
          name="password"
          label="密码"
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
            同意本网站的 <a href="#">协议</a>
          </Checkbox>
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注　册&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default KrRegisterForm
