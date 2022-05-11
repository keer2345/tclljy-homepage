import React, { useEffect, useState } from 'react'
import 'element-theme-default'
import { Menu } from 'element-react'
import { Link, history } from 'umi'
import { Row, Col } from 'antd'

const menuData = [
  { id: '1', route: '/', name: '首页' },
  { id: '2', route: '/job', name: '找工作' },
  { id: '3', route: '/resume', name: '招人才' },
  { id: '4', route: '/company', name: '找企业' },
  { id: '5', route: '/about', name: '关于我们' },
]

const KrMenu = () => {
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

  const setHistoryPath = (id: string) => {
    // setDefaultActive(id)
    console.log('jump to:', history.location.pathname)
    // localStorage.setItem('jumpPath', history.location.pathname)
  }
  return (
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
              {/* <Link to={item.route}>{item.name}</Link> */}
            </Menu.Item>
          ))}
        </Menu>
      </Col>
    </Row>
  )
}

export default KrMenu
