import React, { useEffect, useState } from 'react'
import { Card, Row, Col, message, Pagination, Button } from 'antd'
import { fetchResumeList } from '@/services/resume'
import ResumeCard from './ResumeCard'

const { Meta } = Card

const ResumeList = ({
  from,
  search = '',
  categoryId = '0',
  expSort = '1',
  eduSort = '1',
}: any) => {
  const [loading, setLoading] = useState(true)
  const [resumeList, setResumeList] = useState([])
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
      jobCategoryId: categoryId,
      expSort: expSort,
      eduSort: eduSort,
    })
  }, [search, categoryId, expSort, eduSort])

  useEffect(() => {
    if (params) {
      setLoading(true)
      setPageSize(params.pageSize)
      getResumeList(params)
    }
  }, [params])

  const loadDataPagination = (page: number) => {
    setParams({ ...params, currentPage: page - 1 })
  }

  const getResumeList = async (params: { [key: string]: any }) => {
    try {
      const res = await fetchResumeList(params)
      if (res.success) {
        let contents = res.data.contents
        for (var index in contents) {
          contents[index]['categories'] = contents[index].categories.sort(
            (a: any, b: any) => a.sort - b.sort,
          )
          if (contents[index].otherJob) {
            contents[index]['categories'].find(
              (item: any) => item.name == '其他',
            ).name = '其他 (' + contents[index].otherJob + ')'
          }
          contents[index].age =
            new Date().getFullYear() -
            new Date(contents[index].birthday).getFullYear()
        }

        setLoading(false)
        setResumeList(contents)
        setCurrentPage(res.data.currentPage + 1)
        setTotalPages(res.data.totalPages)
        setTotalItems(res.data.totalItems)
      }
    } catch (error) {
      message.error('加载简历信息失败，服务器连接异常')
    }
  }

  const resumeLists =
    totalItems > 0 ? (
      resumeList.map((item) => <ResumeCard item={item} />)
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
          <Meta title="暂无简历" description="未查询到符合条件的简历" />
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
          {resumeLists}
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
    // <div className="site-card-border-less-wrapper">
    //   <div className="site-card-wrapper">
    //     <Row gutter={{ xs: 8, sm: 12, md: 16, lg: 20 }}>{resumeLists}</Row>
    //   </div>
    // </div>
  )
}

export default ResumeList
