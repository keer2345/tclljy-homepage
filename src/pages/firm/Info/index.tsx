import React, { useEffect, useState } from 'react'
import {
  Button,
  message,
  Tag,
  Card,
  Row,
  Col,
  Typography,
  Modal,
  Input,
} from 'antd'
import { getUser } from '@/components/common/Common'
import { fetchFirm } from '@/services/firm'
import FirmInfo from '@/components/firm/FirmInfo'
import { history } from 'umi'
import JobList from '@/components/job/JobList'

const Info = ({ match }) => {
  const [firmId, setFirmId] = useState('')
  const [userinfo, setUserinfo] = useState({})
  const [firm, setFirm] = useState({})
  const [firmLoading, setFirmLoading] = useState(true)

  const [error, setError] = useState()

  useEffect(() => {
    const id = match.params.id
    setFirmId(id)

    let userid = 0

    if (localStorage.getItem('userInfo')) {
      const userInfoStorage = JSON.parse(localStorage.getItem('userInfo'))
      getUser().then((res) => {
        setUserinfo(res)
        //判断用户是否合法
        if (userInfoStorage.id == res.id) {
          userid = res.id
        }
        getFirm(userid, id)
      })
    } else {
      getFirm(userid, id)
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
      message.error(error.data.msg || '加载职位详情失败，服务器连接异常')
    }
  }

  return (
    <>
      <Row>&nbsp;</Row>
      <Row>
        <Col span={24}>
          <Typography>
            <Typography.Title level={3}>企业详情</Typography.Title>
          </Typography>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Button type="link" onClick={() => history.push('/')}>
            首页
          </Button>
          /
          <Button type="link" onClick={() => history.push('/company')}>
            企业列表
          </Button>
        </Col>
      </Row>
      <Row>
        {firmLoading && (
          <Col span={24}>
            <Card title="企业详情" loading={firmLoading}></Card>
          </Col>
        )}
        {!firmLoading && (
          <Col span={24}>
            <FirmInfo firm={firm} userinfo={userinfo} from="list" />
          </Col>
        )}
      </Row>

      <Row>&nbsp;</Row>
      <Row>&nbsp;</Row>
      <Row>
        <Col span={24}>
          <Typography>
            <Typography.Title level={4}>
              <p id="jobs">该企业发布的职位：</p>
            </Typography.Title>
          </Typography>
        </Col>
        <Col span={24}>
          <JobList from="list" firmid={firm.id} />
        </Col>
      </Row>
    </>
  )
}

export default Info
