import JobCategory from '@/components/job/JobCategory'
import KrSearch from '@/components/KrSearch'
import React from 'react'
import { Row, Col, Pagination } from 'antd'
import JobList from '@/components/job/JobList'
import './index.css'

const All = () => {
  const itemRender = (current: number, type: string, originalElement: any) => {
    if (type === 'prev') {
      return <a>上一页</a>
    }
    if (type === 'next') {
      return <a>下一页</a>
    }
    return originalElement
  }
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

      <JobList from="list" />

      <Row justify="center">
        <Pagination
          defaultCurrent={1}
          total={100}
          hideOnSinglePage
          showSizeChanger={false}
          itemRender={itemRender}
        />
      </Row>
    </>
  )
}

export default All
