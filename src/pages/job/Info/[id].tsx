import React, { useEffect, useState } from 'react'
import { message, Tag, Card, Row, Col } from 'antd'
import KrCarouselImage from '@/components/KrCarouselImage'
import { fetchJob } from '@/services/job'
import './index.css'

import { UnorderedListOutlined } from '@ant-design/icons'
import JobInfo from '@/components/job/JobInfo'
import { getUserInfo } from '@/services/user'
import { getUser } from '@/components/common/Common'

const Info = ({ match }) => {
  const [jobId, setJobId] = useState('')
  const [userinfo, setUserinfo] = useState({})
  const [job, setJob] = useState({})
  const [jobLoading, setJobLoading] = useState(true)

  useEffect(() => {
    const id = match.params.id
    setJobId(id)

    let userid = 0

    if (localStorage.getItem('userInfo')) {
      getUser().then((res) => {
        setUserinfo(res)
        userid = res.id
        getJob(id, { userid: userid, channel: 'web' })
      })
    } else {
      getJob(id, { userid: userid, channel: 'web' })
    }
  }, [])

  const getJob = async (id: string, params: { [key: string]: any }) => {
    try {
      const res = await fetchJob(id, params)
      if (res.success) {
        // setDescription(result.description)
        setJob(res.data)
        setJobLoading(false)
      }
    } catch (error) {
      message.error(error.data.msg || '加载职位详情失败，服务器连接异常')
    }
  }

  return (
    <>
      <KrCarouselImage />
      <Row>&nbsp;</Row>
      <Row gutter={[12, 12]}>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 16 }}>
          {jobLoading && <Card loading={jobLoading}></Card>}
          {!jobLoading && (
            <JobInfo job={job} userinfo={userinfo} from={'list'} />
          )}
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
