import JobCategory from '@/components/job/JobCategory'
import KrSearch from '@/components/KrSearch'
import React from 'react'
import { Row, Col } from 'antd'

const All = () => {
  return (
    <>
      <Row justify="center">
        <Col>
          <KrSearch search="job" />
        </Col>
        <Col>
          <JobCategory />
        </Col>
      </Row>
    </>
  )
}

export default All
