import { UmiComponentProps } from '@/common/type'
import React, { useEffect, useState } from 'react'
import { message, Dropdown, Layout, Menu, Row, Col, Avatar, Image } from 'antd'
import { Link } from 'umi'
import './index.less'
import classNames from 'classnames'
import {
  AppstoreOutlined,
  CloudOutlined,
  SettingOutlined,
  ProfileOutlined,
  PoweroffOutlined,
  UserOutlined,
} from '@ant-design/icons'

const { Header, Content, Footer } = Layout
const { SubMenu } = Menu

interface LayoutProps extends UmiComponentProps {}

const menuData = [
  { route: '/', name: '首页', click: true },
  { route: '/job', name: '找工作', click: false },
  { route: '/resume', name: '招人才', click: false },
  { route: '/company', name: '找企业', click: false },
  // { route: '/login', name: '登录', click: false },
  // { route: '/register', name: '注册', click: false },
]

const BaseLayout = (props: LayoutProps) => {
  const [userInfo, setUserInfo] = useState<User.UserInfo>({})
  useEffect(() => {
    if (localStorage.getItem('userInfo')) {
      setUserInfo(JSON.parse(localStorage.getItem('userInfo') || '{}'))
    }
  }, [])

  const menu = (
    <Menu>
      <Menu.ItemGroup title="企业发布">
        <Menu.Item icon={<CloudOutlined />}>我的企业</Menu.Item>
        <Menu.Item icon={<AppstoreOutlined />}>我的职位</Menu.Item>
      </Menu.ItemGroup>
      <Menu.Divider />
      <Menu.ItemGroup title="求职者">
        <Menu.Item icon={<ProfileOutlined />}>我的简历</Menu.Item>
      </Menu.ItemGroup>
      <Menu.Divider />
      <Menu.Item icon={<SettingOutlined />}>
        <a rel="noopener noreferrer" href="https://www.antgroup.com">
          账户设置
        </a>
      </Menu.Item>
      <Menu.Item icon={<PoweroffOutlined />}>
        <a rel="noopener noreferrer" href="https://www.antgroup.com">
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
              theme="light"
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
            {localStorage.getItem('satoken') &&
            localStorage.getItem('userInfo') ? (
              <Row justify="end">
                <Col span={24}>
                  <Row justify="end">
                    {/* <Link to="/user/account" className="menu-item">
                      <span>
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
                    </Link> */}
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
