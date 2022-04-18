import KrCarouselImage from '@/components/KrCarouselImage'
import React, { useEffect, useState } from 'react'
import ProCard from '@ant-design/pro-card'
import { Avatar, Image, Button, Breadcrumb } from 'antd'
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

const Setting = () => {
  const [userInfo, setUserInfo] = useState(0)

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

        <ProCard
          // title="　"
          headerBordered
        >
          setting
        </ProCard>
      </ProCard>
    </>
  )
}

export default Setting
