import React, { useEffect, useState } from 'react'
import ProCard from '@ant-design/pro-card'
import { Row, Col } from 'antd'
import { history } from 'umi'
import './index.css'

const KrLoginNav = () => {
  return (
    <>
      {/* <ProCard style={{ marginTop: 8 }} gutter={8} ghost> */}
      <Row style={{ marginTop: 8 }} gutter={8}>
        <Col xs={{ span: 12 }} sm={{ span: 12 }} md={{ span: 6 }}>
          <ProCard
            layout="center"
            hoverable
            bordered
            style={{ background: '#4492d2' }}
            onClick={() => history.push('/job')}
          >
            <span className="font-size">职位浏览</span>
          </ProCard>
        </Col>
        <Col xs={{ span: 12 }} sm={{ span: 12 }} md={{ span: 6 }}>
          <ProCard
            layout="center"
            style={{ background: '#5ab5e6' }}
            hoverable
            bordered
            onClick={() => history.push('/resume')}
          >
            <span className="font-size">求职简历</span>
          </ProCard>
        </Col>
        <Col xs={{ span: 12 }} sm={{ span: 12 }} md={{ span: 6 }}>
          <ProCard
            layout="center"
            style={{ background: '#4496d2' }}
            hoverable
            bordered
            onClick={() => history.push('/company')}
          >
            <span className="font-size">企业列表</span>
          </ProCard>
        </Col>
        <Col xs={{ span: 12 }} sm={{ span: 12 }} md={{ span: 6 }}>
          <ProCard
            layout="center"
            style={{ background: '#5ab5e6' }}
            hoverable
            bordered
            onClick={() => {
              if (localStorage.getItem('userInfo')) {
                history.push('#')
              } else {
                history.push('/user/login')
              }
            }}
          >
            <span className="font-size">发布信息</span>
          </ProCard>
        </Col>
      </Row>
      {/* </ProCard> */}
    </>
  )
}

export default KrLoginNav
