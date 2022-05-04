import React, { useEffect, useState } from 'react'
import { message, Tag, Card, Row, Col, Typography } from 'antd'
import { fetchJob, fetchResumeFavJob, fetchResumeSendJob } from '@/services/job'
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
          getFavStatus(id, userInfoStorage.resume)
          getSendStatus(id, userInfoStorage.resume)
        }
        getJob(id, { userid: userid, channel: 'web' })
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

  return (
    <>
      {/* <KrCarouselImage /> */}
      <Row>&nbsp;</Row>
      <Row gutter={[12, 12]}>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 16 }}>
          <Row gutter={[12, 12]}>
            <Col span={24}>
              <Typography>
                <Typography.Title level={3}>职位详情</Typography.Title>
              </Typography>
            </Col>
            <Col span={24}>
              {jobLoading && <Card loading={jobLoading}></Card>}
              {!jobLoading && (
                <JobInfo job={job} userinfo={userinfo} from={'list'} />
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
