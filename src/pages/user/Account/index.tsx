import KrCarouselImage from '@/components/KrCarouselImage'
import React, { useEffect, useState } from 'react'
import ProCard from '@ant-design/pro-card'
import { Avatar, Image, message } from 'antd'
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
import { getUser } from '@/components/common/Common'
import FormMessage from '@/components/common/FormMessage'

const Account = () => {
  const [userInfo, setUserInfo] = useState({})

  useEffect(() => {
    if (!localStorage.getItem('userInfo')) {
      if (!history) return
      const { query } = history.location
      const { redirect } = query as { redirect: string }
      history.push(redirect || '/')
      return
    } else {
      getUser().then((res) => {
        setUserInfo(res)
      })
    }
  }, [])

  useEffect(() => {
    setUserInfo(JSON.parse(localStorage.getItem('userInfo') || '{}'))
  }, [])

  const cardClick = (route: string) => {
    history.push(route)
  }

  const cardClick2 = (route: string) => {
    if (userInfo.level == '1' || userInfo.firm == '0') {
      message.error('您还没有入驻企业，或还未审核通过，不能操作该功能！')
    } else {
      history.push(route)
    }
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
            {userInfo.firm && userInfo.firm >= 1 ? (
              <>
                <ProCard style={{ marginTop: 8 }} gutter={8} title="企业服务">
                  <ProCard
                    layout="center"
                    bordered
                    hoverable
                    onClick={() => cardClick('/user/company')}
                  >
                    我的企业
                  </ProCard>
                  <ProCard
                    layout="center"
                    bordered
                    hoverable
                    onClick={() => cardClick2('/user/job')}
                  >
                    我的职位
                  </ProCard>
                  <ProCard
                    layout="center"
                    bordered
                    hoverable
                    onClick={() => cardClick2('/user/sendResume')}
                  >
                    投递给我的简历
                  </ProCard>
                  <ProCard
                    layout="center"
                    bordered
                    hoverable
                    onClick={() => cardClick2('/user/favResume')}
                  >
                    我收藏的简历
                  </ProCard>
                </ProCard>
              </>
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
                  onClick={() => cardClick('/user/company')}
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
