import React, { useEffect, useState } from 'react'
import { history, useModel } from 'umi'
import { message, Tabs, Space, Alert } from 'antd'
import {
  MobileOutlined,
  AlipayCircleOutlined,
  TaobaoCircleOutlined,
  WeiboCircleOutlined,
} from '@ant-design/icons'
import {
  LoginForm,
  ProFormText,
  ProFormCaptcha,
  ProFormCheckbox,
} from '@ant-design/pro-form'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { getCaptchaCode, getUserInfo, login } from '@/services/login'

const LoginMessage: React.FC<{ content: string }> = ({ content }) => (
  <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
)

const KrLoginForm = () => {
  const [captchaUid, setCaptchaUid] = useState<string>('')
  const [captchaImage, setCaptchaImage] = useState<string>('')
  const [captchaCode, setCaptchaCode] = useState<string>('')
  const [captchaCodeChange, setCaptchaCodeChange] = useState<number>(0)
  const [userLoginState, setUserLoginState] = useState<API.RespResult>({})
  const [type, setType] = useState<string>('account')
  // const { initialState, setInitialState } = useModel('@@initialState')

  // const fetchUserInfo = async () => {
  //   const userInfo = await initialState?.fetchUserInfo?.()
  //   if (userInfo) {
  //     await setInitialState((s) => ({
  //       ...s,
  //       currentUser: userInfo,
  //     }))
  //   }
  // }

  const getCaptcha = async () => {
    const res = await getCaptchaCode()
    console.log('res', res.data)
    setCaptchaUid(res.data.uid)
    setCaptchaImage(res.data.image)
  }

  useEffect(() => {
    getCaptcha()
  }, [captchaCodeChange])

  const handleSubmit = async (values: User.LoginParams) => {
    try {
      values['from'] = 'web'
      values['type'] = type

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
        // console.log('vovo', vovo.username)

        if (!history) return
        const { query } = history.location
        const { redirect } = query as { redirect: string }
        history.push(redirect || '/')
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
          <Tabs.TabPane key={'mobile'} tab={'短信登录'} />
          <Tabs.TabPane key={'wx'} tab={'微信登录'} />
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
              placeholder={'账号 / 手机号 / 邮箱'}
              rules={[
                {
                  required: true,
                  message: '请输入账号、手机号、或邮箱!',
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
            <ProFormCaptcha
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={'prefixIcon'} />,
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
                prefix: <LockOutlined className={'prefixIcon'} />,
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
