import React from 'react'
import { message, Tag, Card, Row, Col, Button } from 'antd'

const FirmInfo = ({ job }) => {
  return (
    <Card title="企业信息" style={{ color: '#999999' }}>
      <Row justify="start">
        <Col>
          <Button type="link">{job.firm.name}</Button>
        </Col>
      </Row>
      <Row gutter={[2, 2]}>
        <Col>
          <Tag color="magenta">性质</Tag>
        </Col>
        <Col>{job.firm.nature.name}</Col>
      </Row>
      <Row gutter={[2, 2]}>
        <Col>
          <Tag color="magenta">规模</Tag>
        </Col>
        <Col>{job.firm.scale.name}</Col>
      </Row>
      <Row gutter={[2, 2]}>
        <Col>
          <Tag color="magenta">行业</Tag>
        </Col>
        <Col>{job.firm.industry.name}</Col>
      </Row>
      <Row gutter={[2, 2]}>
        <Col>
          <Tag color="blue">地区</Tag>
        </Col>
        {!job.firm.region && (
          <Col>
            {job.firm.province.forShort}·{job.firm.city.forShort}
          </Col>
        )}
        {job.firm.region && (
          <Col>
            {job.firm.province.forShort}·{job.firm.city.forShort}·
            {job.firm.region.forShort}
          </Col>
        )}
      </Row>
      <Row gutter={[2, 2]}>
        <Col>
          <Tag color="blue">地址</Tag>
        </Col>
        <Col>{job.firm.address || '（未填写）'}</Col>
      </Row>
    </Card>
  )
}

export default FirmInfo
