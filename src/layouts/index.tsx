import { UmiComponentProps } from '@/common/type'
import React from 'react'
import { message, Layout, Menu, Row, Col } from 'antd'
import { Link } from 'umi'
import './index.less'
import classNames from 'classnames'

const { Header, Content, Footer } = Layout

interface LayoutProps extends UmiComponentProps {}

const menuData = [
  { route: '/', name: '首页', click: true },
  { route: '/gz', name: '找工作', click: false },
  { route: '/jl', name: '招人才', click: false },
  { route: '/gs', name: '找企业', click: false },
  // { route: '/login', name: '登录', click: false },
  // { route: '/register', name: '注册', click: false },
]

const BaseLayout = (props: LayoutProps) => {
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
                <Col span={10}></Col>
                <Col span={11}>
                  <Link to="/user/login" className="menu-item">
                    <span>登录</span>
                  </Link>
                </Col>
                <Col span={1}></Col>
                <Col span={2}>
                  <Link to="/user/logout" className="menu-item">
                    <span>退出</span>
                  </Link>
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
