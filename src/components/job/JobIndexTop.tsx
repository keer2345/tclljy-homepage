import { getJobTop } from '@/services/job'
import React, { useEffect, useState } from 'react'
import { Card, Row, Col } from 'antd'

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
    <Col span={4}>
      <Card
        size="small"
        title={item.name}
        extra={item.mianyi ? '待遇面议' : item.minSalary + '~' + item.maxSalary}
        style={{ width: 300 }}
      >
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </Card>
    </Col>
  ))

  return (
    <div>
      <Row justify="space-between">{jobIndexTop}</Row>
    </div>
  )
}

export default JobIndexTop
