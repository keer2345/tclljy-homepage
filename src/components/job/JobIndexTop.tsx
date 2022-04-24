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
    <Col span={8}>
      <Card
        size="small"
        title={item.name}
        // extra={item.mianyi ? '待遇面议' : item.minSalary + ' ~ ' + item.maxSalary}
        extra={<span className="extra">sfdjif</span>}
        headStyle={{
          color: '#0081ff',
        }}
        hoverable={true}
      >
        Card content
      </Card>
    </Col>
  ))

  return (
    <div>
      {/* <Row justify="space-between">{jobIndexTop}</Row> */}
      <div className="site-card-wrapper">
        <Row gutter={16}>{jobIndexTop}</Row>
      </div>
    </div>
  )
}

export default JobIndexTop
