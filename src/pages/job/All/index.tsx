import JobCategory from '@/components/job/JobCategory'
import KrSearch from '@/components/KrSearch'
import React, { useEffect, useState } from 'react'
import { Row, Col, Card } from 'antd'
import JobList from '@/components/job/JobList'
import './index.css'

const All = () => {
  const [searchValue, setSearchValue] = useState('')

  return (
    <>
      <Row justify="center">
        <Col span={4}></Col>
        <Col span={12}>
          <Card className="card" bordered>
            <KrSearch search="job" changeSearchValue={setSearchValue} />
          </Card>
        </Col>
        <Col span={3}></Col>
      </Row>
      <Row justify="center">
        <Col>
          <JobCategory from="list" />
        </Col>
      </Row>

      <JobList from="list" search={searchValue} />
    </>
  )
}

export default All
