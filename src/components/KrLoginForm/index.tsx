import React, { useState } from 'react'
import { message, Tabs, Space } from 'antd'
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

const KrLoginForm = () => {
  const [type, setType] = useState<string>('account')

  return (
    <div>
      <LoginForm
        logo=""
        title="登录蓝领家园"
        subTitle=" "
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
      >
        <Tabs activeKey={type} onChange={setType}>
          <Tabs.TabPane key={'account'} tab={'密码登录'} />
          <Tabs.TabPane key={'mobile'} tab={'短信登录'} />
          <Tabs.TabPane key={'wx'} tab={'微信登录'} />
        </Tabs>
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
