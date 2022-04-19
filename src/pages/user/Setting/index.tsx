import KrCarouselImage from '@/components/KrCarouselImage'
import React, { useEffect, useState } from 'react'
import ProCard from '@ant-design/pro-card'
import { message } from 'antd'
import { Link, history } from 'umi'
import SettingLeft from './SettingLeft'
import { updateUser } from '@/services/user'
import UpdateUserInfo from './UpdateUserInfo'

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

        {/* Update UserInfo */}
        <UpdateUserInfo
          userInfo={userInfo}
          updateState={updateState}
          handleSubmit={handleSubmit}
        />
      </ProCard>
    </>
  )
}

export default Setting
