import { getUser } from '@/components/common/Common'
import React, { useEffect, useState } from 'react'
import { Link, history } from 'umi'
import { Row, Col, Card } from 'antd'
import KrCarouselImage from '@/components/KrCarouselImage'
import ProCard from '@ant-design/pro-card'
import './index.css'

const MyFirm = () => {
  const [userinfo, setUserinfo] = useState({})

  useEffect(() => {
    if (!localStorage.getItem('userInfo')) {
      if (!history) return
      const { query } = history.location
      const { redirect } = query as { redirect: string }
      history.push(redirect || '/')
      return
    } else {
      getUser().then((res) => {
        console.log('res', res)
        setUserinfo(res)
      })
    }
  }, [])

  return (
    <>
      <KrCarouselImage />

      <ProCard direction="column" ghost gutter={[0, 8]}>
        <ProCard layout="left" bordered>
          <Link to="/user/account">返回个人主页</Link>
        </ProCard>
      </ProCard>
      <Card title="我的企业">
        <Row gutter={[6, 6]} justify="center">
          <Col
            xs={{ span: 24 }}
            sm={{ span: 12 }}
            md={{ span: 12 }}
            lg={{ span: 8 }}
          >
            {userinfo.firm == '0' && <>您还没有入驻企业，请先入驻吧！</>}
            {userinfo.firm > '0' && (
              <ProCard
                layout="center"
                hoverable
                bordered
                style={{ background: '#4492d2' }}
                onClick={() => history.push('/job')}
              >
                <span className="font-size">企业详情</span>
              </ProCard>
            )}
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 12 }}
            md={{ span: 12 }}
            lg={{ span: 8 }}
          >
            {userinfo.firm == '0' && (
              <ProCard
                layout="center"
                style={{ background: '#5ab5e6' }}
                hoverable
                bordered
                onClick={() => history.push('/resume')}
              >
                <span className="font-size">企业入驻</span>
              </ProCard>
            )}
            {userinfo.firm > '0' && (
              <ProCard
                layout="center"
                style={{ background: '#5ab5e6' }}
                hoverable
                bordered
                onClick={() => history.push('/resume')}
              >
                <span className="font-size">编辑企业</span>
              </ProCard>
            )}
          </Col>
        </Row>
      </Card>
    </>
  )
}

export default MyFirm
