import React, { useEffect, useState } from 'react'
import 'element-theme-default'
import { Menu } from 'element-react'
import { Link, history } from 'umi'
import { Row, Col, Menu as AntMenu, Dropdown, Image, Avatar } from 'antd'
import {
  HomeOutlined,
  SettingOutlined,
  PoweroffOutlined,
  UserOutlined,
  DownOutlined,
} from '@ant-design/icons'

const menuData = [
  { id: '1', route: '/', name: '首页' },
  { id: '2', route: '/job', name: '找工作' },
  { id: '3', route: '/resume', name: '招人才' },
  { id: '4', route: '/company', name: '找企业' },
  { id: '5', route: '/about', name: '关于我们' },
]
const menuLogin = [
  { route: '/user/login', name: '登录' },
  { route: '/user/register', name: '注册' },
]
// const menuAccount2 = [
//   { id: '2', route: '/user/account', name: '我的主页' },
//   { id: '3', route: '/user/setting', name: '账户设置' },
//   { id: '4', route: '/user/logout', name: '退出' },
// ]
const menuAccount = (
  <AntMenu>
    <AntMenu.Item key={'account'} icon={<HomeOutlined />}>
      <a rel="noopener noreferrer" href="/user/account">
        我的主页
      </a>
    </AntMenu.Item>
    <AntMenu.Divider />
    <AntMenu.Item key={'setting'} icon={<SettingOutlined />}>
      <a rel="noopener noreferrer" href="/user/setting">
        账户设置
      </a>
    </AntMenu.Item>
    <AntMenu.Item key={'exit'} icon={<PoweroffOutlined />}>
      <a rel="noopener noreferrer" href="/user/logout">
        退出
      </a>
    </AntMenu.Item>
  </AntMenu>
)

const KrMenu = ({ userInfo }) => {
  console.log('his:', history.location.pathname.split('/')[1])
  const [defaultActive, setDefaultActive] = useState('1')
  const [currentRoute, setCurrentRoute] = useState('/')

  useEffect(() => {
    localStorage.setItem('jumpPath', history.location.pathname)

    let path = history.location.pathname.split('/')[1] || '/'
    if (path != '/') {
      path = '/' + path
    }
    const menu = menuData.find((item) => item.route === path)
    let index = '0'
    if (menu) {
      index = menu.id
    }

    setCurrentRoute(path)
    setDefaultActive(index)
  }, [history.location.pathname])

  return (
    <Row justify="space-between">
      <Col>
        <Row justify="start">
          <Col>
            <Link to="/">
              <div className="logo" />
            </Link>
          </Col>
          <Col>
            <Menu
              theme="light"
              defaultActive={defaultActive}
              mode="horizontal"
              className="el-menu-demo"
            >
              {menuData.map((item) => (
                <Menu.Item index={item.id}>
                  <Link to={item.route}>{item.name}</Link>
                </Menu.Item>
              ))}
            </Menu>
          </Col>
        </Row>
      </Col>
      <Col>
        <Row justify="end">
          <Menu
            theme="light"
            defaultActive="0"
            mode="horizontal"
            className="el-menu-demo"
          >
            {!localStorage.getItem('userInfo') &&
              menuLogin.map((item) => (
                <Menu.Item index="1">
                  <Link to={item.route}>{item.name}</Link>
                </Menu.Item>
              ))}
            {localStorage.getItem('userInfo') && (
              // <Menu.SubMenu
              //   index="1"
              //   title={JSON.parse(localStorage.getItem('userInfo')).username}
              // >
              //   {menuAccount.map((item) => (
              //     <Menu.Item index={item.id}>
              //       <Link to={item.route}>{item.name}</Link>
              //     </Menu.Item>
              //   ))}
              // </Menu.SubMenu>
              <Menu.Item>
                <Dropdown overlay={menuAccount}>
                  <a
                    // className="ant-dropdown-link"
                    onClick={(e) => e.preventDefault()}
                  >
                    {/* <span style={{ color: '#fff' }}> */}
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
                      　{userInfo.username}　<DownOutlined />
                      {/* <strong>　控制台</strong> */}
                    </span>
                  </a>
                </Dropdown>
              </Menu.Item>
            )}
          </Menu>
        </Row>
      </Col>
    </Row>
  )
}

export default KrMenu
