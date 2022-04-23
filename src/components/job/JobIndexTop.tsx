import { getJobTop } from '@/services/job'
import React, { useEffect, useState } from 'react'
import { Tag, Divider } from 'antd'

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
      message.error('服务器连接错误')
    }
  }

  const jobIndexTop = jobList.map((item) => (
    <Tag key={item.id}>{item.name}</Tag>
  ))

  return <div>{jobIndexTop}</div>
}

export default JobIndexTop
