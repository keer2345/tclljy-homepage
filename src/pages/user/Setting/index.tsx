import KrCarouselImage from '@/components/KrCarouselImage'
import React, { useEffect, useState } from 'react'
import ProCard from '@ant-design/pro-card'
import { message } from 'antd'
import { Link, history } from 'umi'
import SettingLeft from './SettingLeft'
import { updatePwd, updateUser } from '@/services/user'
import UpdateUserInfo from './UpdateUserInfo'
import ModifyPassword from './ModifyPassword'

const Setting = () => {
  const [userInfo, setUserInfo] = useState(0)
  const [updateState, setUpdateState] = useState<API.RespResult>({})
  const [component, setComponent] = useState('UpdateUserInfo')

  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
  }

  const changeComponent = (component: string) => {
    setComponent(component)
  }

  useEffect(() => {
    if (!localStorage.getItem('userInfo')) {
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

  const updateUserInfo = async (values: User.UserInfo) => {
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
      setUpdateState(error.data)
      message.error(error.data.msg)
    }
  }
  const modifyPassword = async (values) => {
    try {
      values['userId'] = userInfo.id
      values['channel'] = 'web'
      values['reset'] = false

      const res = await updatePwd({ ...values })

      if (res.success && res.data) {
        setUpdateState({ success: true })
        message.success('密码修改成功！')
        return
      }
    } catch (error) {
      setUpdateState(error.data)
      message.error(error.data.msg)
    }
  }

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
          <SettingLeft userInfo={userInfo} changeComponent={changeComponent} />
        </ProCard>

        {component === 'UpdateUserInfo' && (
          <UpdateUserInfo
            userInfo={userInfo}
            updateState={updateState}
            formItemLayout={formItemLayout}
            handleSubmit={updateUserInfo}
          />
        )}

        {component === 'ModifyPassword' && (
          <ModifyPassword
            updateState={updateState}
            formItemLayout={formItemLayout}
            handleSubmit={modifyPassword}
          />
        )}
      </ProCard>
    </>
  )
}

export default Setting
