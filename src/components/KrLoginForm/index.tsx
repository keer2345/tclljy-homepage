import React, { useEffect, useState } from 'react'
import { history } from 'umi'
import { message, Tabs, Space, Alert, Input, Divider } from 'antd'
import {
  MobileOutlined,
  AlipayCircleOutlined,
  TaobaoCircleOutlined,
  WeiboCircleOutlined,
} from '@ant-design/icons'
import ProForm, {
  LoginForm,
  ProFormText,
  ProFormCaptcha,
  ProFormCheckbox,
} from '@ant-design/pro-form'
import {
  UserOutlined,
  LockOutlined,
  SafetyCertificateOutlined,
} from '@ant-design/icons'
import { getCaptchaCode, getUserInfo, login } from '@/services/user'

const LoginMessage: React.FC<{ content: string }> = ({ content }) => (
  <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
)

const KrLoginForm = () => {
  const [captchaUid, setCaptchaUid] = useState<string>('')
  const [captchaImage, setCaptchaImage] = useState<string>('')
  const [captchaCodeChange, setCaptchaCodeChange] = useState<number>(0)

  const [userLoginState, setUserLoginState] = useState<API.RespResult>({})
  const [type, setType] = useState<string>('account')

  const getCaptcha = async () => {
    try {
      const res = await getCaptchaCode()
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

  const handleSubmit = async (values: User.LoginParams) => {
    try {
      values['from'] = 'web'
      values['type'] = type
      values['uid'] = captchaUid

      const res = await login({ ...values })
      if (res.success && res.data) {
        localStorage.setItem(res.data.tokenName, res.data.tokenValue)
        localStorage.setItem('userid', res.data.loginId)
        message.success('登录成功!')

        setUserLoginState({})

        // await fetchUserInfo()

        const resp = await getUserInfo()
        const userInfo: User.UserInfo = resp.data
        localStorage.setItem('userInfo', JSON.stringify(userInfo))
        // const vovo: User.UserInfo = JSON.parse(
        //   localStorage.getItem('userInfo') || '{}',
        // )

        if (!history) return
        const { query } = history.location
        const { redirect } = query as { redirect: string }
        const jumpPath = localStorage.getItem('jumpPath')
        localStorage.removeItem('jumpPath')
        if (jumpPath && jumpPath != '/user/login') {
          history.push(jumpPath)
        } else {
          history.push(redirect || '/')
        }
        return
      }
    } catch (error) {
      setUserLoginState(error.data)
      message.error(error.data.msg)
      setUserLoginState(error.data)
    }
  }

  const { success, msg } = userLoginState

  return (
    <div>
      <LoginForm
        logo=""
        title="登　录"
        subTitle=" "
        initialValues={{ autoLogin: false }}
        scrollToFirstError
        actions={
          <Space
          // style={{
          //   float: 'right',
          // }}
          >
            还没有注册？
            <a style={{ color: '#1891ff' }} href="register">
              点击注册
            </a>
          </Space>
        }
        onFinish={async (values) => {
          await handleSubmit(values as User.LoginParams)
        }}
      >
        <Tabs activeKey={type} onChange={setType}>
          <Tabs.TabPane key={'account'} tab={'密码登录'} />
          {/* <Tabs.TabPane key={'mobile'} tab={'短信登录'} /> */}
          {/* <Tabs.TabPane key={'wx'} tab={'微信登录'} /> */}
        </Tabs>

        {!success && msg && <LoginMessage content={msg || '登录失败'} />}

        {type === 'account' && (
          <>
            <ProFormText
              name="username"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={'prefixIcon'} />,
              }}
              placeholder={'账号'}
              // placeholder={'账号 / 手机号 / 邮箱'}
              rules={[
                {
                  required: true,
                  message: '请输入账号、手机号、或邮箱！',
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={'prefixIcon'} />,
              }}
              placeholder={'密码'}
              rules={[
                {
                  required: true,
                  message: '请输入密码！',
                },
              ]}
            />

            {/* 添加验证码功能
                https://www.jb51.net/article/213114.htm */}
            <ProForm.Group>
              <ProFormText
                name="captchaCode"
                width={180}
                fieldProps={{
                  size: 'large',
                  prefix: (
                    <SafetyCertificateOutlined className={'prefixIcon'} />
                  ),
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
          </>
        )}
        {type === 'mobile' && (
          <>
            <ProFormText
              fieldProps={{
                size: 'large',
                prefix: <MobileOutlined className={'prefixIcon'} />,
              }}
              name="mobile"
              placeholder={'手机号'}
              rules={[
                {
                  required: true,
                  message: '请输入手机号！',
                },
                {
                  pattern: /^1\d{10}$/,
                  message: '手机号格式错误！',
                },
              ]}
            />
            <ProFormCaptcha
              fieldProps={{
                size: 'large',
                prefix: <SafetyCertificateOutlined className={'prefixIcon'} />,
              }}
              captchaProps={{
                size: 'large',
              }}
              placeholder={'请输入验证码'}
              captchaTextRender={(timing, count) => {
                if (timing) {
                  return `${count} ${'获取验证码'}`
                }
                return '获取验证码'
              }}
              name="captcha"
              rules={[
                {
                  required: true,
                  message: '请输入验证码！',
                },
              ]}
              onGetCaptcha={async () => {
                message.success('获取验证码成功！验证码为：1234')
              }}
            />
          </>
        )}
        <div
          style={{
            marginBottom: 24,
          }}
        >
          <ProFormCheckbox noStyle name="autoLogin">
            记住我
          </ProFormCheckbox>
          <a
            style={{
              float: 'right',
            }}
            href="forgot"
          >
            忘记密码
          </a>
        </div>
      </LoginForm>
    </div>
  )
}

export default KrLoginForm
