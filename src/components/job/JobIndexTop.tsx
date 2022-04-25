import { getJobTop } from '@/services/job'
import React, { useEffect, useState } from 'react'
import { Card, Row, Col, message } from 'antd'
import './JobIndexTop.css'
import JobCard from './JobCard'

const JobIndexTop = () => {
  const [jobList, setJobList] = useState([])

  useEffect(() => {
    getJobList()
  }, [])

  const getJobList = async () => {
    try {
      const res = await getJobTop()
      if (res.success) {
        setJobList(res.data.contents)
      }
    } catch (error) {
      message.error('加载职位信息失败，服务器连接错误')
    }
  }

  const jobIndexTop = jobList.map((item) => <JobCard item={item} />)

  return (
    <div className="site-card-border-less-wrapper">
      <div className="site-card-wrapper">
        <Row gutter={16}>
          {jobIndexTop}
          <Col span={8} className="site-col-border-less-wrapper">
            <Card
              size="small"
              title="item.name"
              extra={<span className="extra">待遇面议</span>}
              headStyle={{
                color: '#0081ff',
              }}
              hoverable={true}
              bordered={false}
            >
              Card content
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default JobIndexTop
