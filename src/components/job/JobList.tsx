import { fetchJobList } from '@/services/job'
import React, { useEffect, useState } from 'react'
import { Row, message } from 'antd'
import './JobList.css'
import JobCard from './JobCard'

const JobList = ({ from }: any) => {
  const [jobList, setJobList] = useState([])

  useEffect(() => {
    let params: { [key: string]: any } = {}

    if (from === 'top') {
      params['pageSize'] = 12
      params['enable'] = 1
      params['audit'] = 1
    } else if (from === 'list') {
      params['pageSize'] = 2
      params['enable'] = 1
      params['audit'] = 1
    }

    getJobList(params)
  }, [])

  const getJobList = async (params: { [key: string]: any }) => {
    try {
      const res = await fetchJobList(params)
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
        <Row
          gutter={[
            { xs: 8, sm: 12, md: 16, lg: 20 },
            { xs: 3, sm: 3 },
          ]}
        >
          {jobIndexTop}
        </Row>
      </div>
    </div>
  )
}

export default JobList
