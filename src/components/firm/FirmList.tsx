import React, { useEffect, useState } from 'react'
import { Button, Row, message, Pagination, Card, Col } from 'antd'
import { fetchFirmList } from '@/services/firm'
import KrLoading from '../common/KrLoading'
import FirmCard from './FirmCard'

const { Meta } = Card

const FirmList = ({ from = 'list', search = '' }) => {
  const [loading, setLoading] = useState(true)
  const [firmList, setFirmList] = useState([])
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
      pageSize = 6
    } else if (from === 'list') {
      pageSize = 18
    }

    setParams({
      ...params,
      pageSize: pageSize,
      enable: 1,
      audit: 1,
      name: search,
    })
  }, [search])

  useEffect(() => {
    if (params) {
      setLoading(true)
      setPageSize(params.pageSize)
      getFirmList(params)
    }
  }, [params])

  const getFirmList = async (params: { [key: string]: any }) => {
    try {
      const res = await fetchFirmList(params)
      if (res.success) {
        setLoading(false)
        setFirmList(res.data.contents)
        setCurrentPage(res.data.currentPage + 1)
        setTotalPages(res.data.totalPages)
        setTotalItems(res.data.totalItems)
      }
    } catch (error) {
      message.error('加载职位信息失败，服务器连接异常')
    }
  }

  const pagination = () => (
    <Row justify="end">
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
  )

  const loadDataPagination = (page: number) => {
    setParams({ ...params, currentPage: page - 1 })
  }

  const firmLists =
    totalItems > 0 ? (
      firmList.map((item) => <FirmCard key={item.id} item={item} />)
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
        {from != 'top' && (
          <>
            {pagination()}
            <Row>　</Row>
          </>
        )}
        {loading && (
          <>
            <Row justify="center">
              <KrLoading loading={loading} />
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
          {firmLists}
        </Row>

        {from != 'top' && (
          <>
            <Row>　</Row>
            {pagination()}
          </>
        )}
      </div>
    </div>
  )
}

export default FirmList
