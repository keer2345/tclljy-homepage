import { UmiComponentProps } from '@/common/type'
import React, { useEffect, useState } from 'react'
import { message, Dropdown, Layout, Menu, Row, Col, Avatar, Image } from 'antd'
import { Link } from 'umi'
import './index.less'
import classNames from 'classnames'
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
import { getUserInfo, logout } from '@/services/user'

const { Header, Content, Footer } = Layout
const { SubMenu } = Menu

interface LayoutProps extends UmiComponentProps {}

const menuData = [
  { route: '/', name: '首页', click: true },
  { route: '/job', name: '找工作', click: false },
  { route: '/resume', name: '招人才', click: false },
  { route: '/company', name: '找企业', click: false },
]

const BaseLayout = (props: LayoutProps) => {
  const [userInfo, setUserInfo] = useState<User.UserInfo>({})
  const [refresh, setRefresh] = useState(0)

  const getUser = async () => {
    try {
      const res = await getUserInfo()
      if (res.success) {
        const userInfo: User.UserInfo = res.data
        localStorage.setItem('userInfo', JSON.stringify(userInfo))
        setUserInfo(JSON.parse(localStorage.getItem('userInfo') || '{}'))
        localStorage.setItem('userid', userInfo.id || '')
      } else {
        localStorage.clear()
      }
    } catch (error) {
      localStorage.clear()
    }
  }

  const getCookie = (name: string) => {
    //获取指定名称的cookie的值
    var arrstr = document.cookie.split('; ')
    for (var i = 0; i < arrstr.length; i++) {
      var temp = arrstr[i].split('=')
      if (temp[0] == name) return unescape(temp[1])
    }
  }

  useEffect(() => {
    setUserInfo(JSON.parse(localStorage.getItem('userInfo') || '{}'))
  }, [])

  useEffect(() => {
    const cookie = getCookie('satoken')
    if (cookie) {
      if (!localStorage.getItem('userInfo')) {
        localStorage.setItem('satoken', cookie)
        getUser()
      } else {
        setUserInfo(JSON.parse(localStorage.getItem('userInfo') || '{}'))
      }
    } else {
      localStorage.clear()
    }
  }, [refresh])

  const exit = async () => {
    try {
      const res = await logout()

      if (res.success) {
        message.success('已退出登录！')
        localStorage.clear()
        setRefresh(refresh + 1)
      }
    } catch (error) {
      console.log(error.data)
    }
  }

  const menu = (
    <Menu>
      <Menu.Item key={'profile'} icon={<HomeOutlined />}>
        <a rel="noopener noreferrer" href="/user/account">
          我的主页
        </a>
      </Menu.Item>
      <Menu.Divider />
      {/* <Menu.ItemGroup title="企业发布">
        <Menu.Item key={'firm'} icon={<CloudOutlined />}>
          我的企业
        </Menu.Item>
        <Menu.Item key={'job'} icon={<AppstoreOutlined />}>
          我的职位
        </Menu.Item>
      </Menu.ItemGroup>
      <Menu.Divider />
      <Menu.ItemGroup title="求职者">
        <Menu.Item key={'resume'} icon={<ProfileOutlined />}>
          我的简历
        </Menu.Item>
      </Menu.ItemGroup>
      <Menu.Divider /> */}
      <Menu.Item key={'profile'} icon={<SettingOutlined />}>
        <a rel="noopener noreferrer" href="/user/setting">
          账户设置
        </a>
      </Menu.Item>
      <Menu.Item key={'exit'} icon={<PoweroffOutlined />}>
        <a rel="noopener noreferrer" onClick={exit}>
          退出
        </a>
      </Menu.Item>
    </Menu>
  )

  return (
    <Layout className="layout">
      <Header className="header">
        <Link to="/">
          <div className="logo" />
        </Link>
        <Row>
          <Col span={14}>
            <Menu
              className="menu"
              // theme="light"
              // onSelect={()=>console.log("vovo")}
              mode="horizontal"
              defaultSelectedKeys={['1']}
            >
              {menuData.map((menu) => (
                <Menu.Item key={`/${menu.route}`}>
                  <Link to={menu.route} className="menu-item">
                    {menu.click ? (
                      <strong>{menu.name}</strong>
                    ) : (
                      <span>{menu.name}</span>
                    )}
                  </Link>
                </Menu.Item>
              ))}
            </Menu>
          </Col>
          <Col span={9}>
            {localStorage.getItem('userInfo') ? (
              <Row justify="end">
                <Col span={24}>
                  <Row justify="end">
                    <Dropdown overlay={menu}>
                      <a
                        className="ant-dropdown-link"
                        onClick={(e) => e.preventDefault()}
                      >
                        <span style={{ color: '#fff' }}>
                          {userInfo.avatar || userInfo.avatarWx ? (
                            <Avatar
                              src={
                                <Image
                                  src={userInfo.avatar || userInfo.avatarWx}
                                  preview={false}
                                />
                              }
                            />
                          ) : (
                            <Avatar icon={<UserOutlined />} />
                          )}
                          　{userInfo.username} <strong>　控制台</strong>
                        </span>
                      </a>
                    </Dropdown>
                  </Row>
                </Col>
              </Row>
            ) : (
              <Row justify="end">
                <Col span={19}></Col>
                <Col span={2}>
                  <Link to="/user/login" className="menu-item">
                    <span>登录</span>
                  </Link>
                </Col>
                <Col span={1}></Col>
                <Col span={2}>
                  <Link to="/user/register" className="menu-item">
                    <span>注册</span>
                  </Link>
                </Col>
              </Row>
            )}
          </Col>
          <Col span={1}></Col>
        </Row>
      </Header>
      <div className="container">
        <Content>
          <div className="site_layout_content">{props.children}</div>
        </Content>
      </div>
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  )
}

export default BaseLayout
