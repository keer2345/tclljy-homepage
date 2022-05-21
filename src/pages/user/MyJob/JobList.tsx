import React, { useEffect, useState } from 'react'
import { fetchJobList } from '@/services/job'
import { Button } from 'antd'
import { history } from 'umi'
import ProList from '@ant-design/pro-list'

const JobList = ({ userinfo, setTag }) => {
  const [jobList, setJobList] = useState([])
  const [jobLoading, setJobLoading] = useState(true)

  const [params, setParams] = useState<{ [key: string]: any }>()
  const [pageSize, setPageSize] = useState(20)
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [totalItems, setTotalItems] = useState(0)

  useEffect(() => {
    setParams({
      ...params,
      pageSize: pageSize,
      enable: 1,
      audit: 1,
      firmId: userinfo.firm,
    })
    fetchJobList(params).then((res) => {
      setJobLoading(false)
      setJobList(res.data.contents)
      console.log('res:', res.data)
      setCurrentPage(res.data.currentPage + 1)
      setTotalPages(res.data.totalPages)
      setTotalItems(res.data.totalItems)
    })
  }, [])

  type JobItem = {
    id: number
    name: string
    mianyi: boolean
    minSalary: string
    maxSalary: string
  }
  return (
    <ProList<JobItem>
      headerTitle="企业职位列表"
      loading={jobLoading}
      toolBarRender={() => {
        return [
          <Button
            key="3"
            type="primary"
            onClick={() => {
              setTag(2)
            }}
          >
            新建职位
          </Button>,
        ]
      }}
    />
  )
}

export default JobList
