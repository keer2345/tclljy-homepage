import KrCarouselImage from '@/components/KrCarouselImage'
import KrSearch from '@/components/KrSearch'
import './index.less'
import { Row, Col, Card, Typography, Divider } from 'antd'
import KrLoginNav from '@/components/KrLoginNav'
import JobCategory from '@/components/job/JobCategory'
import JobList from '@/components/job/JobList'
import ResumeList from '@/components/resume/ResumeList'
import { useState } from 'react'
import FirmList from '@/components/firm/FirmList'

const { Text, Link } = Typography

export default function IndexPage() {
  return (
    <>
      <KrCarouselImage />

      <KrLoginNav />
      <Row>　</Row>
      <Row justify="end">
        <Col>
          <Link href="/job" className="title-link">
            更多职位...&nbsp;
          </Link>
        </Col>
      </Row>

      <JobList from="top" firmid="-99" />

      <Row justify="end">
        <Col>
          <Link href="/company" className="title-link">
            更多企业...&nbsp;
          </Link>
        </Col>
      </Row>
      <FirmList from="top" />

      <Row justify="end">
        <Col>
          <Link href="/resume" className="title-link">
            更多简历...&nbsp;
          </Link>
        </Col>
      </Row>

      <ResumeList from="top" />
    </>
  )
}
