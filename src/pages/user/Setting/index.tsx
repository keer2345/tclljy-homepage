import KrCarouselImage from '@/components/KrCarouselImage'
import React, { useEffect, useState } from 'react'
import ProCard from '@ant-design/pro-card'
import {
  message,
  Avatar,
  Image,
  Button,
  Breadcrumb,
  Row,
  Col,
  Space,
} from 'antd'
import { Link, history } from 'umi'
import {
  HomeOutlined,
  AppstoreOutlined,
  CloudOutlined,
  SettingOutlined,
  ProfileOutlined,
  PoweroffOutlined,
  UserOutlined,
  ColumnHeightOutlined,
  LeftOutlined,
} from '@ant-design/icons'
import SettingLeft from './SettingLeft'
import ProForm, {
  ModalForm,
  DrawerForm,
  QueryFilter,
  LightFilter,
  StepsForm,
  ProFormText,
  ProFormDateRangePicker,
  ProFormSelect,
  ProFormRadio,
  LoginForm,
} from '@ant-design/pro-form'
import { getUserInfo, updateUser } from '@/services/user'
import FormMessage from '@/components/common/FormMessage'

const Setting = () => {
  const [userInfo, setUserInfo] = useState(0)
  const [updateState, setUpdateState] = useState<API.RespResult>({})

  useEffect(() => {
    console.log('aaa')
    if (!localStorage.getItem('userInfo')) {
      console.log('bbb')
      if (!history) return
      const { query } = history.location
      const { redirect } = query as { redirect: string }
      history.push(redirect || '/')
      return
    }
  }, [])

  useEffect(() => {
    setUserInfo(JSON.parse(localStorage.getItem('userInfo') || '{}'))
  }, [])

  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
  }

  const handleSubmit = async (values: User.UserInfo) => {
    try {
      const userInfoNew = { ...userInfo, ...values }
      const res = await updateUser({ ...userInfoNew })

      if (res.success && res.data) {
        const userInfo: User.UserInfo = res.data
        localStorage.setItem('userInfo', JSON.stringify(userInfo))
        setUserInfo(userInfo)
        setUpdateState({})
        message.success('修改成功！')
        return
      }
    } catch (error) {
      console.log('error:', error)
      setUpdateState(error.data)
      message.error(error.data.msg)
    }
  }

  const { success, msg } = updateState

  return (
    <>
      <KrCarouselImage />
      <ProCard direction="column" ghost gutter={[0, 8]}>
        <ProCard layout="left" bordered>
          <Link to="/user/account">返回个人主页</Link>
        </ProCard>
      </ProCard>
      <ProCard split="vertical">
        <ProCard title="账号设置" colSpan="25%">
          <SettingLeft userInfo={userInfo} />
        </ProCard>

        <ProCard title="个人资料" headerBordered>
          <div
            style={{
              margin: 24,
            }}
          >
            <ProForm
              // labelWidth="auto"
              layout={'horizontal'}
              size={'large'}
              initialValues={
                {
                  // username: userInfo.username,
                }
              }
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
                await handleSubmit(values as User.UserInfo)
              }}
            >
              {!success && msg && <FormMessage content={msg || '修改失败'} />}
              <ProFormText
                width="md"
                name="username"
                label="账号"
                tooltip="账号注册后不可更改"
                placeholder={userInfo.username}
                value={userInfo.username}
                disabled
              />
              <ProFormText
                width="md"
                name="realname"
                label="姓名"
                tooltip="可输入您的真实姓名"
                placeholder="请输入姓名"
                value={userInfo.realname}
              />
              <ProFormText
                width="md"
                name="identity"
                label="证件号码"
                placeholder="请输入证件号码"
                value={userInfo.identity}
              />
            </ProForm>
          </div>
        </ProCard>
      </ProCard>
    </>
  )
}

export default Setting
