import { UmiComponentProps } from '@/common/type'
import React from 'react'
import { Layout, Menu } from 'antd'
import { Link } from 'umi'
import styles from './index.less'

const { Header, Content, Footer } = Layout

interface LayoutProps extends UmiComponentProps {}

const menuData = [
  { route: '/hero', name: '英雄' },
  { route: '/item', name: '局内道具' },
  { route: '/summoner', name: '召唤师技能' },
]

const BaseLayout = (props: LayoutProps) => {
  return (
    <Layout className="layout">
      <Header>
        <div className={styles.logo} />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
          {new Array(15).fill(null).map((_, index) => {
            const key = index + 1
            return <Menu.Item key={key}>{`nav ${key}`}</Menu.Item>
          })}
        </Menu>
      </Header>
      {/* <Content style={{ padding: '0 50px' }}> */}
      <Content className="container">
        <h1>hello</h1>
        <div className="site-layout-content">Content</div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  )
}

export default BaseLayout
