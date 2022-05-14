import React, { useEffect, useState } from 'react'
import { message, Tag, Card, Row, Col, Typography, Modal, Input } from 'antd'
import { getUser } from '@/components/common/Common'
import { fetchFirm } from '@/services/firm'
import FirmInfo from '@/components/firm/FirmInfo'
import { history } from 'umi'

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

  const seeJobs = () => {
    history.push('#jobs')
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
        {firmLoading && (
          <Col span={24}>
            <Card title="企业详情" loading={firmLoading}></Card>
          </Col>
        )}
        {!firmLoading && (
          <Col span={24}>
            <FirmInfo
              firm={firm}
              userinfo={userinfo}
              from="list"
              seeJobs={seeJobs}
            />
          </Col>
        )}
      </Row>
      <Row>
        <Col span={24}></Col>
      </Row>
    </>
  )
}

export default Info
