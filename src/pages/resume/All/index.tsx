import JobCategory from '@/components/job/JobCategory'
import KrSearch from '@/components/KrSearch'
import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Tag, Button } from 'antd'
import ResumeList from '@/components/resume/ResumeList'
import './index.css'
import { spellNamePath } from '@ant-design/pro-table/lib/utils/cellRenderToFromItem'

const All = () => {
  const [searchValue, setSearchValue] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [categoryName, setCategoryName] = useState('')
  const [clearFlag, setClearFlag] = useState(0)

  const clearCategory = () => {
    setCategoryId('')
    setClearFlag(clearFlag + 1)
  }

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
            clearFlag={clearFlag}
          />
        </Col>
      </Row>

      <Row>&nbsp;</Row>
      <Row justify="start">
        {categoryId && (
          <Col>
            期望职位：
            <Tag
              closable
              onClose={(e) => clearCategory()}
              onClick={(e) => clearCategory()}
            >
              {categoryName}
            </Tag>
          </Col>
        )}
        {searchValue && (
          <Col>
            简历名称：
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
                clearCategory()
                setSearchValue('')
              }}
              onClick={(e) => {
                clearCategory()
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
