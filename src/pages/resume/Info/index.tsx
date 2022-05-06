import React, { useEffect, useState } from 'react'
import { message, Tag, Card, Row, Col, Typography, Modal, Input } from 'antd'
import { fetchResume } from '@/services/resume'

import { getUser } from '@/components/common/Common'
import { history } from 'umi'
import { resolveConfig } from 'prettier'
import ResumeInfo from '@/components/resume/ResumeInfo'

const Info = ({ match }) => {
  const [resumeId, setResumeId] = useState('')
  const [userinfo, setUserinfo] = useState({})
  const [resume, setResume] = useState({})
  const [resumeLoading, setResumeLoading] = useState(true)

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
        }
        getResume(userid, id)
      })
    }
  }, [])

  //获取简历
  const getResume = async (userid: string, resumeid: string) => {
    try {
      const res = await fetchResume(userid, resumeid)
      if (res.success) {
        setResume(res.data)
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
                <ResumeInfo resume={resume} userinfo={userinfo} from={'list'} />
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
