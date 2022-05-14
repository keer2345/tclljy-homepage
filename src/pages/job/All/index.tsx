import JobCategory from '@/components/job/JobCategory'
import KrSearch from '@/components/KrSearch'
import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Tag, Button } from 'antd'
import JobList from '@/components/job/JobList'
import './index.css'

const All = () => {
  const [searchValue, setSearchValue] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [categoryName, setCategoryName] = useState('')

  // useEffect(() => {
  //   if (categoryId === '') {
  //     setSearchValue('')
  //   }
  // }, [categoryId])

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
            职位类别：
            <Tag
              closable
              onClose={(e) => setCategoryId('')}
              onClick={(e) => setCategoryId('')}
            >
              {categoryName}
            </Tag>
          </Col>
        )}
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
        {categoryId && searchValue && (
          <Col>
            <Tag
              color="magenta"
              closable
              onClose={(e) => {
                setCategoryId('')
                setSearchValue('')
              }}
              onClick={(e) => {
                setCategoryId('')
                setSearchValue('')
              }}
            >
              清空条件
            </Tag>
          </Col>
        )}
      </Row>

      <JobList from="list" search={searchValue} categoryId={categoryId} />
    </>
  )
}

export default All
