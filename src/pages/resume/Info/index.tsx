import React, { useEffect, useState } from 'react'
import { message, Tag, Card, Row, Col, Typography, Modal, Input } from 'antd'
import {
  fetchFirmFavJob,
  fetchFirmSended,
  fetchResume,
  firmFavJob,
} from '@/services/resume'

import { getUser } from '@/components/common/Common'
import { history } from 'umi'
import ResumeInfo from '@/components/resume/ResumeInfo'

const Info = ({ match }) => {
  const [resumeId, setResumeId] = useState('')
  const [userinfo, setUserinfo] = useState({})
  const [resume, setResume] = useState({})
  const [resumeLoading, setResumeLoading] = useState(true)
  const [error, setError] = useState()

  const [fav, setFav] = useState(false)
  const [favLoading, setFavLoading] = useState(true)
  const [send, setSend] = useState(false)
  const [sendLoading, setSendLoading] = useState(true)

  useEffect(() => {
    const id = match.params.id
    setResumeId(id)
    let userid = '0'
    if (localStorage.getItem('userInfo')) {
      const userInfoStorage = JSON.parse(localStorage.getItem('userInfo'))
      getUser().then((res) => {
        setUserinfo(res)
        //判断用户是否合法
        if (userInfoStorage.id == res.id) {
          userid = res.id
          getResume(userid, id)
          if (res.firm > 0) {
            getFavStatus(id, res.firm)
            getSendStatus(res.firm, id)
          } else {
            setFavLoading(false)
            setSendLoading(false)
          }
        }
      })
    } else {
      setFavLoading(false)
      setSendLoading(false)
      getResume(userid, id)
    }
  }, [])

  const favResume = () => {
    if (userinfo.id) {
      setFavLoading(true)
      favResumeMethod(fav, resumeId)
    } else {
      const error = '只有登录后才能收藏，请先登录吧！'
      setError(error)
      message.error(error)
    }
  }

  const favResumeMethod = async (fav: boolean, resumeId: string) => {
    try {
      const res = await firmFavJob(fav, resumeId)
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

  //判断是否被企业收藏
  const getFavStatus = async (resumeid: string, firmid: string) => {
    try {
      const res = await fetchFirmFavJob(resumeid, firmid)
      if (res.success) {
        setFav(res.data)
        setFavLoading(false)
      }
    } catch (error) {
      setFavLoading(false)
    }
  }

  //判断投递
  const getSendStatus = async (jobid: string, resumeid: string) => {
    try {
      const res = await fetchFirmSended(jobid, resumeid)
      if (res.success) {
        setSend(res.data)
        setSendLoading(false)
      }
    } catch (error) {
      setSendLoading(false)
    }
  }

  const goLogin = () => {
    localStorage.setItem('jumpPath', history.location.pathname)
    history.push('/user/login')
  }

  //获取简历
  const getResume = async (userid: string, resumeid: string) => {
    try {
      const res = await fetchResume(userid, resumeid)
      if (res.success) {
        const result = res.data
        result['categories'] = result.categories.sort(
          (a: any, b: any) => a.sort - b.sort,
        )
        if (result.otherJob) {
          result['categories'].find((item: any) => item.name == '其他').name =
            '其他 (' + result.otherJob + ')'
        }
        result['strongs'] = result.strongs.sort(
          (a: any, b: any) => a.sort - b.sort,
        )
        result['age'] =
          new Date().getFullYear() - new Date(result.birthday).getFullYear()
        setResume(result)
        setResumeLoading(false)
      }
    } catch (error) {
      message.error(error.data.msg || '加载简历详情失败，服务器连接异常')
    }
  }

  return (
    <>
      <Row>&nbsp;</Row>
      <Row>
        <Col span={24}>
          <Typography>
            <Typography.Title level={3}>简历详情</Typography.Title>
          </Typography>
        </Col>
      </Row>

      <Row gutter={[12, 12]}>
        <Col
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          // md={{ span: 16 }}
        >
          <Row gutter={[12, 12]}>
            <Col span={24}>
              {resumeLoading && (
                <Card title="简历详情" loading={resumeLoading}></Card>
              )}
              {!resumeLoading && (
                <ResumeInfo
                  resume={resume}
                  userinfo={userinfo}
                  from={'list'}
                  fav={fav}
                  send={send}
                  favLoading={favLoading}
                  sendLoading={favLoading}
                  favResume={favResume}
                  error={error}
                  goLogin={goLogin}
                />
              )}
            </Col>
          </Row>
        </Col>
        {/* <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }}>
          <Row gutter={[12, 12]}>
            <Col span={24}></Col>
            <Col span={24}></Col>
          </Row>
        </Col> */}
      </Row>
    </>
  )
}

export default Info
