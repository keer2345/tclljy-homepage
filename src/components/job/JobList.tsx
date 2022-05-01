import { fetchJobList } from '@/services/job'
import React, { useEffect, useState } from 'react'
import { Row, message, Pagination } from 'antd'
import './JobList.css'
import JobCard from './JobCard'

const JobList = ({ from }: any) => {
  const [jobList, setJobList] = useState([])
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
    let params: { [key: string]: any } = {}

    if (from === 'top') {
      setPageSize(12)
      params['pageSize'] = pageSize
      params['enable'] = 1
      params['audit'] = 1
    } else if (from === 'list') {
      setPageSize(2)
      params['pageSize'] = pageSize
      params['enable'] = 1
      params['audit'] = 1
    }

    getJobList(params)
  }, [])

  const getJobList = async (params: { [key: string]: any }) => {
    try {
      const res = await fetchJobList(params)
      if (res.success) {
        setJobList(res.data.contents)
        console.log('popo:', res.data)
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
                pageSize={2}
                total={totalItems}
                // hideOnSinglePage
                showSizeChanger={false}
                itemRender={itemRender}
              />
            </Row>
          </>
        )}
      </div>
    </div>
  )
}

export default JobList
