import KrCarouselImage from '@/components/KrCarouselImage'
import React, { useEffect, useState } from 'react'
import ProCard from '@ant-design/pro-card'
import { Avatar, Image } from 'antd'
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
} from '@ant-design/icons'

const Account = () => {
  const [userInfo, setUserInfo] = useState(0)

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

  const cardClick = (route: string) => {
    history.push(route)
  }

  return (
    <>
      <KrCarouselImage />

      <ProCard split="vertical">
        <ProCard title="我的主页" colSpan="25%">
          <>
            <ProCard layout="center">
              {userInfo.avatar || userInfo.avatarWx ? (
                <Avatar
                  size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                  src={
                    <Image
                      src={userInfo.avatar || userInfo.avatarWx}
                      preview={false}
                    />
                  }
                />
              ) : (
                <Avatar
                  size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                  icon={<UserOutlined />}
                />
              )}
            </ProCard>
            <ProCard layout="center" bordered>
              {userInfo.username}
            </ProCard>
          </>
        </ProCard>
        <ProCard
          // title="　"
          headerBordered
        >
          <>
            {userInfo.level && userInfo.level >= 2 ? (
              <ProCard style={{ marginTop: 8 }} gutter={8} title="企业服务">
                <ProCard layout="center" bordered hoverable>
                  我的企业
                </ProCard>
                <ProCard layout="center" bordered hoverable>
                  我的职位
                </ProCard>
                <ProCard layout="center" bordered hoverable>
                  投递给我的简历
                </ProCard>
                <ProCard layout="center" bordered hoverable>
                  我收藏的简历
                </ProCard>
              </ProCard>
            ) : (
              <ProCard style={{ marginTop: 8 }} gutter={8} title="企业服务">
                <ProCard
                  colSpan={{
                    xs: '50px',
                    sm: '100px',
                    md: '200px',
                    lg: '300px',
                    xl: '400px',
                  }}
                  layout="center"
                  bordered
                  hoverable
                >
                  企业入驻
                </ProCard>
              </ProCard>
            )}

            <ProCard style={{ marginTop: 8 }} gutter={8} title="个人服务">
              <ProCard layout="center" bordered hoverable>
                我的简历
              </ProCard>
              <ProCard layout="center" bordered hoverable>
                我投递的职位
              </ProCard>
              <ProCard layout="center" bordered hoverable>
                我收藏的职位
              </ProCard>
              <ProCard layout="center" bordered hoverable>
                谁看过我
              </ProCard>
            </ProCard>

            <ProCard style={{ marginTop: 8 }} gutter={8} title="其他服务">
              <ProCard layout="center" bordered hoverable>
                浏览记录
              </ProCard>
              <ProCard layout="center" bordered hoverable>
                意见反馈
              </ProCard>
              <ProCard
                layout="center"
                bordered
                hoverable
                onClick={() => cardClick('/user/setting')}
              >
                账号设置
              </ProCard>
              <ProCard layout="center" bordered hoverable>
                后台管理
              </ProCard>
            </ProCard>
          </>
        </ProCard>
      </ProCard>
    </>
  )
}

export default Account
