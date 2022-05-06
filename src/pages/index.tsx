import KrCarouselImage from '@/components/KrCarouselImage'
import KrSearch from '@/components/KrSearch'
import './index.less'
import { Row, Col, Card, Typography } from 'antd'
import KrLoginNav from '@/components/KrLoginNav'
import JobCategory from '@/components/job/JobCategory'
import JobList from '@/components/job/JobList'
import ResumeList from '@/components/resume/ResumeList'
import { useState } from 'react'

const { Text, Link } = Typography

export default function IndexPage() {
  return (
    <>
      <KrCarouselImage />
      <Card size="middle" bordered={false} className="card">
        <Row justify="end">
          {/* <Col span={14} offset={4}>
            <KrSearch />
          </Col> */}
          <Col span={24} offset={0}>
            <Row justify="end">
              <KrLoginNav />
            </Row>
          </Col>
        </Row>
        <Row>　</Row>
        <Row>{/* <JobCategory from="top" /> */}</Row>
      </Card>

      <Row>　</Row>
      <Row justify="start">
        <Col>
          <Link href="#" className="title-link">
            &nbsp;最新职位
          </Link>
        </Col>
        <Col>　</Col>
        <Col>
          <Link href="#" className="title-link">
            更多职位...&nbsp;
          </Link>
        </Col>
      </Row>

      <JobList from="top" />

      <Row justify="start">
        <Col>
          <Link href="#" className="title-link">
            &nbsp;最新简历
          </Link>
        </Col>
        <Col>　</Col>
        <Col>
          <Link href="#" className="title-link">
            更多简历...&nbsp;
          </Link>
        </Col>
      </Row>

      <ResumeList from="top" />
    </>
  )
}
