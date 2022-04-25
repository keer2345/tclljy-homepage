import React from 'react'
import { Card, Col } from 'antd'
import './JobCard.css'

const JobCard = ({ item }) => {
  return (
    <Col span={8} className="site-col-border-less-wrapper">
      <Card
        size="small"
        title={item.name}
        extra={
          <span className="extra">
            {item.mianyi ? '待遇面议' : item.minSalary + ' ~ ' + item.maxSalary}
          </span>
        }
        headStyle={{
          color: '#0081ff',
        }}
        hoverable={true}
        bordered={false}
      >
        Card content
      </Card>
    </Col>
  )
}

export default JobCard
