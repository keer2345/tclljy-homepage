import { fetchJobList } from '@/services/job'
import React, { useEffect, useState } from 'react'
import { Row, message, Pagination } from 'antd'
import './JobList.css'
import JobCard from './JobCard'

const JobList = ({ from, search }: any) => {
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
    if (from === 'top') {
      setParams({ ...params, pageSize: 12, enable: 1, audit: 1, name: search })
    } else if (from === 'list') {
      setParams({ ...params, pageSize: 18, enable: 1, audit: 1, name: search })
    }
    console.log('search:::', search)
  }, [search])

  useEffect(() => {
    if (params) {
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
        setJobList(res.data.contents)
        setCurrentPage(res.data.currentPage + 1)
        setTotalPages(res.data.totalPages)
        setTotalItems(res.data.totalItems)
      }
    } catch (error) {
      message.error('加载职位信息失败，服务器连接错误')
    }
  }

  const jobIndexTop = jobList.map((item) => <JobCard item={item} />)

  return (
    <div className="site-card-border-less-wrapper">
      <div className="site-card-wrapper">
        <Row
          gutter={[
            { xs: 8, sm: 12, md: 16, lg: 20 },
            { xs: 3, sm: 3 },
          ]}
        >
          {jobIndexTop}
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
