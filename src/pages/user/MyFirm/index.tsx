import { getUser } from '@/components/common/Common'
import React, { useEffect, useState } from 'react'
import { Link, history } from 'umi'
import { Row, Col, Card, message } from 'antd'
import KrCarouselImage from '@/components/KrCarouselImage'
import ProCard from '@ant-design/pro-card'
import './index.css'
import { fetchFirm } from '@/services/firm'
import FirmInfo from '@/components/firm/FirmInfo'

const MyFirm = () => {
  const [userinfo, setUserinfo] = useState({})
  const [firm, setFirm] = useState({})
  const [tag, setTag] = useState(1)
  const [firmLoading, setFirmLoading] = useState(true)

  useEffect(() => {
    if (!localStorage.getItem('userInfo')) {
      if (!history) return
      setFirmLoading(false)
      const { query } = history.location
      const { redirect } = query as { redirect: string }
      history.push(redirect || '/')
      return
    } else {
      getUser().then((res) => {
        setUserinfo(res)
        if (res.firm > 0) {
          getFirm(res.id, res.firm)
        } else {
          setFirmLoading(false)
        }
      })
    }
  }, [])

  const getFirm = async (userid: string, firmid: string) => {
    try {
      const res = await fetchFirm(userid, firmid)
      if (res.success) {
        setFirm(res.data)
        setFirmLoading(false)
      }
    } catch (error) {
      setFirmLoading(false)
      message.error(error.data.msg || '加载职位详情失败，服务器连接异常')
    }
  }

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
                onClick={() => setTag(1)}
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
                onClick={() => setTag(2)}
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
                onClick={() => setTag(2)}
              >
                <span className="font-size">编辑企业</span>
              </ProCard>
            )}
          </Col>
        </Row>
      </Card>
      {tag == 1 && firmLoading && (
        <Col span={24}>
          <Card title="企业详情" loading={firmLoading}></Card>
        </Col>
      )}

      {tag == 1 && !firmLoading && (
        <Col span={24}>
          <FirmInfo firm={firm} userinfo={userinfo} from="admin" />
        </Col>
      )}
      {tag == 2 && <Card title="编辑企业"></Card>}
    </>
  )
}

export default MyFirm
