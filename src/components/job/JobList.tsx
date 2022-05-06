import { fetchJobList } from '@/services/job'
import React, { useEffect, useState } from 'react'
import { Button, Row, message, Pagination, Card, Col } from 'antd'
import './JobList.css'
import JobCard from './JobCard'

const { Meta } = Card

const JobList = ({ from, search, categoryId }: any) => {
  const [loading, setLoading] = useState(true)
  const [jobList, setJobList] = useState([])
  const [params, setParams] = useState<{ [key: string]: any }>()
  const [pageSize, setPageSize] = useState(20)
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [totalItems, setTotalItems] = useState(0)

  const itemRender = (current: number, type: string, originalElement: any) => {
    if (type === 'prev') {
      return <a>上一页</a>
    }
    if (type === 'next') {
      return <a>下一页</a>
    }
    return originalElement
  }

  useEffect(() => {
    let pageSize = 20
    if (from === 'top') {
      pageSize = 12
    } else if (from === 'list') {
      pageSize = 18
    }

    setParams({
      ...params,
      pageSize: pageSize,
      enable: 1,
      audit: 1,
      name: search,
      categoryId: categoryId,
    })
  }, [search, categoryId])

  useEffect(() => {
    if (params) {
      setLoading(true)
      setPageSize(params.pageSize)
      getJobList(params)
    }
  }, [params])

  const loadDataPagination = (page: number) => {
    setParams({ ...params, currentPage: page - 1 })
  }

  const getJobList = async (params: { [key: string]: any }) => {
    try {
      const res = await fetchJobList(params)
      if (res.success) {
        setLoading(false)
        setJobList(res.data.contents)
        setCurrentPage(res.data.currentPage + 1)
        setTotalPages(res.data.totalPages)
        setTotalItems(res.data.totalItems)
      }
    } catch (error) {
      message.error('加载职位信息失败，服务器连接异常')
    }
  }

  const jobLists =
    totalItems > 0 ? (
      jobList.map((item) => <JobCard item={item} />)
    ) : (
      <Col
        xs={{ span: 24 }}
        sm={{ span: 12 }}
        md={{ span: 12 }}
        lg={{ span: 8 }}
        xl={{ span: 8 }}
        xxl={{ span: 8 }}
      >
        <Card style={{ width: 300, marginTop: 16 }} loading={loading}>
          <Meta title="暂无职位" description="未查询到符合条件的职位" />
        </Card>
      </Col>
    )

  return (
    <div className="site-card-border-less-wrapper">
      <div className="site-card-wrapper">
        {loading && (
          <>
            <Row justify="center">
              <Button type="primary" loading={loading}>
                加载中...
              </Button>
            </Row>
            <Row>　</Row>
          </>
        )}
        <Row
          gutter={[
            { xs: 8, sm: 12, md: 16, lg: 20 },
            { xs: 3, sm: 3 },
          ]}
        >
          {jobLists}
        </Row>
        {from != 'top' && (
          <>
            <Row>　</Row>
            <Row justify="center">
              <Pagination
                defaultCurrent={1}
                current={currentPage}
                pageSize={pageSize}
                total={totalItems}
                hideOnSinglePage
                showSizeChanger={false}
                itemRender={itemRender}
                onChange={loadDataPagination}
              />
            </Row>
          </>
        )}
      </div>
    </div>
  )
}

export default JobList
