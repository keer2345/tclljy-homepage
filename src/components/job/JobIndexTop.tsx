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
        <Row gutter={{ xs: 8, sm: 12, md: 16, lg: 20 }}>{jobIndexTop}</Row>
      </div>
    </div>
  )
}

export default JobIndexTop
