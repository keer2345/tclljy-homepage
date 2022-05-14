import React, { useState } from 'react'
import './index.css'

import { Row, Col, Card, Tag, Button } from 'antd'
import KrSearch from '@/components/KrSearch'

const All = () => {
  const [searchValue, setSearchValue] = useState('')

  return (
    <>
      <Row justify="center">
        <Col xs={{ span: 0 }} sm={{ span: 0 }} md={{ span: 5 }}></Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 14 }}>
          <Card className="card" bordered>
            <KrSearch
              search="job"
              value={searchValue}
              changeSearchValue={setSearchValue}
            />
          </Card>
        </Col>
        <Col xs={{ span: 0 }} sm={{ span: 0 }} md={{ span: 5 }}></Col>
      </Row>

      <Row>&nbsp;</Row>

      <Row justify="start">
        {searchValue && (
          <Col>
            职位名称：
            <Tag
              closable
              onClose={(e) => setSearchValue('')}
              onClick={(e) => setSearchValue('')}
            >
              {searchValue}
            </Tag>
          </Col>
        )}
        {searchValue && (
          <Col>
            <Tag
              closable
              onClose={(e) => {
                setSearchValue('')
              }}
              onClick={(e) => {
                setSearchValue('')
              }}
            >
              清空条件
            </Tag>
          </Col>
        )}
      </Row>
    </>
  )
}

export default All
