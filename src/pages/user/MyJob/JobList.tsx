import React, { useEffect, useRef, useState } from 'react'
import { fetchJobList } from '@/services/job'
import { Button, message } from 'antd'
import { Link, history, request } from 'umi'
import ProList from '@ant-design/pro-list'
import { requestPromise } from '@/services/request'
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table'
import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons'

const JobList = ({ userinfo, setTag }) => {
  const [jobList, setJobList] = useState([])
  const [jobLoading, setJobLoading] = useState(true)

  const [params, setParams] = useState<{ [key: string]: any }>()
  const [pageSize, setPageSize] = useState(1)
  // const [currentPage, setCurrentPage] = useState(0)
  // const [totalPages, setTotalPages] = useState(0)
  // const [totalItems, setTotalItems] = useState(0)

  useEffect(() => {
    setParams({
      ...params,
      pageSize: pageSize,
      // enable: 1,
      // audit: 1,
      firmId: userinfo.firm,
    })
  }, [])

  // useEffect(() => {
  //   if (param && param.firmId) {
  //     console.log('get job')
  //     setJobLoading(true)
  //     requestPromise('/api/job', param)
  //       .then((res) => {
  //         setJobList(res.data.contents)
  //         setCurrentPage(res.data.currentPage + 1)
  //         setTotalPages(res.data.totalPages)
  //         setTotalItems(res.data.totalItems)
  //       })
  //       .catch((error) => {
  //         message.error(error.data.error)
  //       })
  //       .finally(() => {
  //         setJobLoading(false)
  //       })
  //   }
  // }, [param])

  type JobItem = {
    id: number
    name: string
    mianyi: boolean
    minSalary: string
    maxSalary: string
  }

  const columns: ProColumns<JobItem>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      valueType: 'text',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '职位名称',
      dataIndex: 'name',
      valueType: 'text',
      //       render:(record)=>{
      // console.log('re',record);
      //       }
      render: (dom, record) => (
        <a onClick={() => history.push('/job/info/' + record.id)}>{dom}</a>
      ),
    },
    {
      title: '状态',
      dataIndex: 'enable',
      valueType: 'text',
    },
    {
      title: '审核',
      dataIndex: 'audit',
      valueType: 'text',
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (text, record, _, action) => [
        <a
          key="view"
          onClick={() => {
            history.push('/job/info/' + record.id)
          }}
        >
          查看
        </a>,
        <a
          key="editable"
          onClick={() => {
            console.log('edit')
          }}
        >
          编辑
        </a>,
      ],
    },
  ]

  const actionRef = useRef<ActionType>()

  return (
    // <ProList<GithubIssueItem>
    <ProTable<JobItem, API.PageParams>
      headerTitle="企业职位列表"
      rowKey="id"
      options={false}
      toolBarRender={() => [
        <Button
          key="button"
          icon={<PlusOutlined />}
          type="primary"
          onClick={() => {
            setTag(2)
          }}
        >
          新建职位
        </Button>,
      ]}
      columns={columns}
      actionRef={actionRef}
      cardBordered={false}
      dateFormatter="string"
      search={{
        defaultCollapsed: false,
        // labelWidth: 'auto',
      }}
      params={params}
      request={async (params = { ...params, pageSize, current }) => {
        const msg = await requestPromise('/api/job', {
          ...params,
          currentPage: params.current - 1,
        })

        // console.log('msg:', msg.data.contents)
        return {
          data: msg.data.contents,
          success: msg.success,
          total: msg.data.totalItems,
        }
      }}
      pagination={{
        pageSize: 5,
      }}
      // showActions="hover"

      metas={{
        title: {
          dataIndex: 'name',
          title: '职位名称',
        },
      }}
    />
  )
}

export default JobList
