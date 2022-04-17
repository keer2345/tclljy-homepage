import KrCarouselImage from '@/components/KrCarouselImage'
import React, { useEffect, useState } from 'react'
import ProCard from '@ant-design/pro-card'
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
  const [level, setLevel] = useState(0)
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')
    setLevel(userInfo.level)
  }, [])
  return (
    <>
      <KrCarouselImage />

      {level && level >= 2 ? (
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
        <ProCard layout="center" bordered hoverable>
          账号设置
        </ProCard>
        <ProCard layout="center" bordered hoverable>
          后台管理
        </ProCard>
      </ProCard>
    </>
  )
}

export default Account
