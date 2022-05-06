import JobCategory from '@/components/job/JobCategory'
import KrSearch from '@/components/KrSearch'
import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Tag, Button } from 'antd'
import ResumeList from '@/components/resume/ResumeList'
import './index.css'

const All = () => {
  const [searchValue, setSearchValue] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [categoryName, setCategoryName] = useState('')
  return (
    <>
      <Row justify="center">
        <Col span={4}></Col>
        <Col span={12}>
          <Card className="card" bordered>
            <KrSearch
              search="resume"
              value={searchValue}
              changeSearchValue={setSearchValue}
            />
          </Card>
        </Col>
        <Col span={3}></Col>
      </Row>
      <Row justify="start">
        <Col>
          <JobCategory
            from="list"
            changeCategoryId={setCategoryId}
            changeCategoryName={setCategoryName}
          />
        </Col>
      </Row>

      <Row>&nbsp;</Row>
      <Row justify="start">
        {categoryId && (
          <Col>
            期望职位：
            <Tag closable onClose={(e) => setCategoryId('')}>
              {categoryName}
            </Tag>
          </Col>
        )}
        {searchValue && (
          <Col>
            简历名称：
            <Tag closable onClose={(e) => setSearchValue('')}>
              {searchValue}
            </Tag>
          </Col>
        )}
        {categoryId && searchValue && (
          <Col>
            <Tag
              closable
              onClose={(e) => {
                setCategoryId('')
                setSearchValue('')
              }}
            >
              清空条件
            </Tag>
          </Col>
        )}
      </Row>

      <ResumeList from="list" search={searchValue} categoryId={categoryId} />
    </>
  )
}

export default All
