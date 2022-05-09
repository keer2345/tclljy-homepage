import React, { useEffect, useState } from 'react'
import { message, Tag, Card, Row, Col, Typography, Modal, Input } from 'antd'
import {
  fetchJob,
  fetchJobList,
  fetchResumeFavJob,
  fetchResumeSendJob,
  resumeFavJob,
  resumeSendJob,
} from '@/services/job'
import './index.css'

import JobInfo from '@/components/job/JobInfo'
import { getUser } from '@/components/common/Common'
import { history } from 'umi'
import FirmInfo from '@/components/job/FirmInfo'
import FirmJobs from '@/components/job/FirmJobs'

const Info = ({ match }) => {
  const [jobId, setJobId] = useState('')
  const [userinfo, setUserinfo] = useState({})
  const [job, setJob] = useState({})
  const [jobLoading, setJobLoading] = useState(true)
  const [firmJobsLoading, setFirmJobsLoading] = useState(true)
  const [firmJobsList, setFirmJobsList] = useState([])
  const [firmJobsCount, setFirmJobsCount] = useState('0')

  const [fav, setFav] = useState(false)
  const [send, setSend] = useState(false)
  const [favLoading, setFavLoading] = useState(true)
  const [sendLoading, setSendLoading] = useState(true)
  const [sendModal, setSendModal] = useState(false)
  const [sendMsg, setSendMsg] = useState('')

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

  useEffect(() => {
    if (!jobLoading) {
      const params = {
        enable: '1',
        audit: '1',
        firmId: job.firm.id,
        pageSize: '10',
      }
      getFirmJobs(params)
    }
  }, [jobLoading])

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
    } catch (error) {
      setSendLoading(false)
    }
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
  const favJobMethod = async (fav: boolean, jobId: string) => {
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
    if (userinfo.id) {
      if (send) {
        const msg = '您已投递过该职位！'
        message.warn(msg)
        return false
      }
      if (!send && job.firm.id == userinfo.firm) {
        message.warn('这是你的企业发布的职位，无需投递！')
        return false
      }
      if (!userinfo.resume || userinfo.resume == '0') {
        setError('您还没有发布简历，投递失败！')
        message.warn('您还没有发布简历，投递失败！')
        return false
      }
      setSendLoading(true)
      setSendModal(true)
    } else {
      const error = '只有登录后才能投递，请先登录吧！'
      setError(error)
      message.error(error)
    }
  }
  const sendJobMethod = async () => {
    let sendMessage: Job.SendMessage = {}
    sendMessage['job'] = { id: jobId }
    sendMessage['resume'] = { id: userinfo.resume }
    sendMessage['content'] = sendMsg
    sendMessage['readed'] = false
    sendMessage['readHide'] = false

    try {
      const res = await resumeSendJob(sendMessage)
      if (res.success) {
        setSendLoading(false)
        setSendModal(false)
        message.success('投递成功！')
        setSend(!send)
      }
    } catch (error) {
      setSendLoading(false)
      message.error(error.data.msg)
      setError(error.data.msg)
    }
  }

  const handleModalOk = () => {
    sendJobMethod()
  }

  const handleModalCancel = () => {
    message.warn('您取消了投递！')
    setSendLoading(false)
    setSendModal(false)
  }

  const goLogin = () => {
    localStorage.setItem('jumpPath', history.location.pathname)
    history.push('/user/login')
  }

  const sendModalComponent = () => (
    <Modal
      title="投递职位"
      visible={sendModal}
      onOk={handleModalOk}
      onCancel={handleModalCancel}
    >
      <p>可输入简单的投递说明：</p>
      <p>&nbsp;</p>
      <p>
        <Input
          value={sendMsg}
          onChange={(e) => {
            setSendMsg(e.target.value.trim())
          }}
        />
      </p>
    </Modal>
  )

  const getFirmJobs = async (params: { [key: string]: any }) => {
    try {
      const res = await fetchJobList(params)
      if (res.success) {
        setFirmJobsLoading(false)
        setFirmJobsList(res.data.contents)
        setFirmJobsCount(res.data.totalItems)
      }
    } catch (error) {
      setFirmJobsLoading(false)
    }
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
              {jobLoading && (
                <Card title="职位详情" loading={jobLoading}></Card>
              )}
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
                  goLogin={goLogin}
                />
              )}
            </Col>
          </Row>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }}>
          <Row gutter={[12, 12]}>
            <Col span={24}>
              {jobLoading && (
                <Card title="企业信息" loading={jobLoading}></Card>
              )}
              {!jobLoading && <FirmInfo job={job} />}
            </Col>
            <Col span={24}>
              {firmJobsLoading && (
                <Card title="企业职位" loading={firmJobsLoading}></Card>
              )}
              {!firmJobsLoading && (
                <FirmJobs
                  firmJobsList={firmJobsList}
                  firmJobsCount={firmJobsCount}
                />
              )}
            </Col>
          </Row>
        </Col>
        {sendModalComponent()}
      </Row>
    </>
  )
}

export default Info
