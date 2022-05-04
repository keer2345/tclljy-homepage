import React, { useEffect, useState } from 'react'
import { message, Tag, Card, Row, Col, Typography } from 'antd'
import {
  fetchJob,
  fetchResumeFavJob,
  fetchResumeSendJob,
  resumeFavJob,
} from '@/services/job'
import './index.css'

import JobInfo from '@/components/job/JobInfo'
import { getUser } from '@/components/common/Common'

const Info = ({ match }) => {
  const [jobId, setJobId] = useState('')
  const [userinfo, setUserinfo] = useState({})
  const [job, setJob] = useState({})
  const [jobLoading, setJobLoading] = useState(true)

  const [fav, setFav] = useState(false)
  const [send, setSend] = useState(false)
  const [favLoading, setFavLoading] = useState(true)
  const [sendLoading, setSendLoading] = useState(true)

  const [error, setError] = useState()

  useEffect(() => {
    const id = match.params.id
    setJobId(id)

    let userid = 0

    if (localStorage.getItem('userInfo')) {
      const userInfoStorage = JSON.parse(localStorage.getItem('userInfo'))
      getUser().then((res) => {
        setUserinfo(res)
        //判断用户是否合法
        if (userInfoStorage.id == res.id) {
          userid = res.id
          getJob(id, { userid: userid, channel: 'web' })
          getFavStatus(id, userInfoStorage.resume)
          getSendStatus(id, userInfoStorage.resume)
        } else {
          getJob(id, { userid: userid, channel: 'web' })
        }
      })
    } else {
      setFavLoading(false)
      setSendLoading(false)
      getJob(id, { userid: userid, channel: 'web' })
    }
  }, [])

  //获取职位
  const getJob = async (id: string, params: { [key: string]: any }) => {
    try {
      const res = await fetchJob(id, params)
      if (res.success) {
        setJob(res.data)
        setJobLoading(false)
      }
    } catch (error) {
      message.error(error.data.msg || '加载职位详情失败，服务器连接异常')
    }
  }
  //判断收藏
  const getFavStatus = async (jobid: string, resumeid: string) => {
    try {
      const res = await fetchResumeFavJob(jobid, resumeid)
      if (res.success) {
        setFav(res.data)
        setFavLoading(false)
      }
    } catch (error) {}
  }
  //判断投递
  const getSendStatus = async (jobid: string, resumeid: string) => {
    try {
      const res = await fetchResumeSendJob(jobid, resumeid)
      if (res.success) {
        setSend(res.data)
        setSendLoading(false)
      }
    } catch (error) {}
  }

  const favJob = () => {
    if (userinfo.id) {
      setFavLoading(true)
      favJobMethod(fav, jobId)
    } else {
      const error = '只有登录后才能收藏，请先登录吧！'
      setError(error)
      message.error(error)
    }
  }
  const favJobMethod = async (fav, jobId) => {
    try {
      const res = await resumeFavJob(fav, jobId)
      if (res.success) {
        setFavLoading(false)
        message.success(fav ? '取消收藏成功' : '收藏成功')
        setFav(!fav)
      }
    } catch (error) {
      setFavLoading(false)
      message.error(error.data.msg)
      setError(error.data.msg)
    }
  }
  const sendJob = () => {
    console.log('send job')
  }

  return (
    <>
      {/* <KrCarouselImage /> */}
      <Row>&nbsp;</Row>
      <Row>
        <Col span={24}>
          <Typography>
            <Typography.Title level={3}>职位详情</Typography.Title>
          </Typography>
        </Col>
      </Row>
      <Row gutter={[12, 12]}>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 16 }}>
          <Row gutter={[12, 12]}>
            <Col span={24}>
              {jobLoading && <Card loading={jobLoading}></Card>}
              {!jobLoading && (
                <JobInfo
                  job={job}
                  userinfo={userinfo}
                  from={'list'}
                  fav={fav}
                  send={send}
                  favLoading={favLoading}
                  sendLoading={sendLoading}
                  favJob={favJob}
                  sendJob={sendJob}
                  error={error}
                />
              )}
            </Col>
          </Row>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }}>
          <Row gutter={[12, 12]}>
            <Col span={24}>bb</Col>
            <Col span={24}>cc</Col>
          </Row>
        </Col>
      </Row>
    </>
  )
}

export default Info
