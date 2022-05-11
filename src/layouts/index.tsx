import { UmiComponentProps } from '@/common/type'
import React, { useEffect, useState } from 'react'
import { message, Layout, Menu, Row, Col } from 'antd'
import { Link, history, UserModelState, Loading, connect } from 'umi'
import './index.less'

import {
  HomeOutlined,
  SettingOutlined,
  PoweroffOutlined,
} from '@ant-design/icons'
import { getUserInfo, logout } from '@/services/user'
import KrMenu from '@/components/KrMenu'

const { Header, Content, Footer } = Layout

interface LayoutProps extends UmiComponentProps {}

const BaseLayout = (props: LayoutProps) => {
  const [userInfo, setUserInfo] = useState<User.UserInfo>({})
  // const [refresh, setRefresh] = useState(0)

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

  const year = () => {
    var date = new Date()
    return date.getFullYear()
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
  }, [])
  // }, [refresh])

  const exit = async () => {
    try {
      const res = await logout()

      if (res.success) {
        message.success('已退出登录！')
        localStorage.clear()
        // setRefresh(refresh + 1)
        history.push('/')
      }
    } catch (error) {
      console.log(error.data)
    }
  }

  const menu = (
    <Menu>
      <Menu.Item key={'account'} icon={<HomeOutlined />}>
        <a rel="noopener noreferrer" href="/user/account">
          我的主页
        </a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key={'setting'} icon={<SettingOutlined />}>
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

  // 解决跳转新页面滚动条不在顶部的问题
  useEffect(() => {
    if (document && history.location.pathname != '/') {
      if (document?.documentElement || document?.body) {
        document.documentElement.scrollTop = document.body.scrollTop = 0
      }
    }
  }, [history.location.pathname])

  return (
    <Layout className="layout">
      <Row>
        <Col
          xs={{ span: 0 }}
          sm={{ span: 0 }}
          md={{ span: 1 }}
          lg={{ span: 2 }}
          xl={{ span: 2 }}
          xxl={{ span: 4 }}
        ></Col>
        <Col
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 22 }}
          lg={{ span: 20 }}
          xl={{ span: 20 }}
          xxl={{ span: 16 }}
        >
          <KrMenu userInfo={JSON.parse(localStorage.getItem('userInfo'))} />
          <Content>
            <div className="site_layout_content">{props.children}</div>
          </Content>
        </Col>
        <Col
          xs={{ span: 0 }}
          sm={{ span: 0 }}
          md={{ span: 1 }}
          lg={{ span: 2 }}
          xl={{ span: 2 }}
          xxl={{ span: 4 }}
        ></Col>
      </Row>

      <Footer style={{ textAlign: 'center' }}>
        <Row justify="center">
          <Col>同城蓝领家园 ©{year()} 柳州同城人力资源有限公司</Col>
        </Row>
        <Row>&nbsp;</Row>
        <Row justify="center" align="middle">
          <Col>
            <Link to="/">
              <div className="logo" />
            </Link>
          </Col>
          <Col>&nbsp;&nbsp;桂ICP备2021008076号</Col>
        </Row>
      </Footer>
    </Layout>
  )
}

// export default BaseLayout
export default connect(
  ({ user, loading }: { user: UserModelState; loading: Loading }) => ({
    user,
    loading: loading.models.user,
  }),
)(BaseLayout)
