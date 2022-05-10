import React, { useEffect, useState } from 'react'
import { Alert, message, Form, Checkbox } from 'antd'
import { getCaptchaCode, getUserInfo, register } from '@/services/user'

import {
  UserOutlined,
  LockOutlined,
  SafetyCertificateOutlined,
} from '@ant-design/icons'

import { history } from 'umi'
import ProForm, { LoginForm, ProFormText } from '@ant-design/pro-form'

const RegisterMessage: React.FC<{ content: string }> = ({ content }) => (
  <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
)

const KrRegisterForm = () => {
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
    <LoginForm
      logo=""
      title="注　册"
      subTitle=""
      onFinish={async (values) => {
        await handleSubmit(values as User.RegisterParams)
      }}
      initialValues={{ agreement: true }}
      // size={'small'}
      scrollToFirstError
      submitter={{
        searchConfig: {
          resetText: '重置',
          submitText: '注册',
        },
        resetButtonProps: {
          style: {
            display: 'none',
          },
        },
      }}
    >
      {!success && msg && <RegisterMessage content={msg || '注册失败'} />}
      <ProFormText
        name="username"
        label="账号"
        placeholder={'请输入账号'}
        hasFeedback
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
        fieldProps={{
          size: 'large',
          prefix: <UserOutlined className={'prefixIcon'} />,
        }}
      />
      <ProFormText.Password
        name="password"
        label="密码"
        fieldProps={{
          size: 'large',
          prefix: <LockOutlined className={'prefixIcon'} />,
        }}
        placeholder={'密码'}
        hasFeedback
        rules={[
          {
            required: true,
            min: 6,
            max: 18,
            message: '密码请输入6-18位字符！',
          },
        ]}
      />
      <ProFormText.Password
        name="password2"
        label="确认密码"
        fieldProps={{
          size: 'large',
          prefix: <LockOutlined className={'prefixIcon'} />,
        }}
        placeholder={'确认密码'}
        hasFeedback
        dependencies={['password']}
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
      />

      <ProForm.Group>
        <ProFormText
          name="captchaCode"
          // label='验证码'
          width={180}
          fieldProps={{
            size: 'large',
            prefix: <SafetyCertificateOutlined className={'prefixIcon'} />,
          }}
          placeholder="验证码"
          rules={[
            {
              required: true,
              message: '请输入验证码！',
            },
          ]}
        />

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
      </ProForm.Group>

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
      >
        <Checkbox>
          同意本网站的 <a href="#">协议</a>
        </Checkbox>
      </Form.Item>
    </LoginForm>
  )
}

export default KrRegisterForm
