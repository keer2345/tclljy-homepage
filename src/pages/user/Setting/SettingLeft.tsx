import React from 'react'
import ProCard from '@ant-design/pro-card'
import { Avatar, Image } from 'antd'
import { UserOutlined } from '@ant-design/icons'

const SettingLeft = ({ userInfo, changeComponent }) => {
  return (
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
      <ProCard
        layout="center"
        bordered
        hoverable
        onClick={() => changeComponent('UpdateUserInfo')}
      >
        个人资料
      </ProCard>
      <ProCard
        layout="center"
        bordered
        hoverable
        onClick={() => changeComponent('ModifyPassword')}
      >
        修改密码
      </ProCard>
      {/* <ProCard layout="center" bordered hoverable>
        账号绑定
      </ProCard>
      <ProCard layout="center" bordered hoverable>
        更换头像
      </ProCard> */}
    </>
  )
}

export default SettingLeft
