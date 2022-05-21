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
      // enable: 1,
      // audit: 1,
      firmId: userinfo.firm,
    })
  }, [])

  useEffect(() => {
    if (params && params.firmId) {
      console.log('get job')
      setJobLoading(true)
      setPageSize(params.pageSize)
      getJobList(params)
    }
  }, [params])

  const getJobList = async (params: { [key: string]: any }) => {
    try {
      const res = await fetchJobList(params)
      console.log(res.data.contents)
      if (res.success) {
        setJobLoading(false)
        setJobList(res.data.contents)
        setCurrentPage(res.data.currentPage + 1)
        setTotalPages(res.data.totalPages)
        setTotalItems(res.data.totalItems)
      }
    } catch (error) {
      message.error('加载职位信息失败，服务器连接异常')
    }
  }
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
