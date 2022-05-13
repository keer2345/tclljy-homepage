import React from 'react'
import { Tag, Card, Row, Col, Avatar } from 'antd'
import { history, Link } from 'umi'
import './FirmCard.css'

const FirmCard = ({ item }) => {
  const url = '/company/info/' + item.id

  return (
    <Col
      className="site-col-border-less-wrapper"
      xs={{ span: 24 }}
      sm={{ span: 12 }}
      md={{ span: 12 }}
      lg={{ span: 8 }}
      xl={{ span: 8 }}
      xxl={{ span: 8 }}
    >
      <Card
        size="small"
        title={
          <>
            <Avatar
              shape="square"
              size="small"
              style={{ color: 'purple', backgroundColor: 'pink' }}
            >
              企
            </Avatar>
            <Link to={url}>&nbsp;{item.name}</Link>
          </>
        }
        extra={
          <span className={item.jobCount > 0 ? 'extra' : 'extra-gray'}>
            {item.jobCount > 0 ? item.jobCount + ' 个职位' : '暂无职位'}
          </span>
        }
        headStyle={{
          color: '#0081ff',
        }}
        hoverable={true}
        bordered={false}
        actions={[
          <Row className="actions">
            <Col span={13}>
              <Row justify="start">
                <Col>&nbsp;&nbsp;&nbsp;&nbsp;{item.nature.name}</Col>
              </Row>
            </Col>
            <Col span={1}></Col>
            <Col span={10}>
              <Row justify="end">
                <Col>
                  {item.region &&
                    item.city.forShort + ' · ' + item.region.forShort}
                  {!item.region &&
                    item.province.forShort + ' · ' + item.city.forShort}
                  &nbsp; &nbsp;
                </Col>
              </Row>
            </Col>
          </Row>,
        ]}
        onClick={() => history.push(url)}
      >
        <Row>
          <Tag color="cyan" className="row-bottom">
            {item.industry.name}
          </Tag>
        </Row>
      </Card>
    </Col>
  )
}

export default FirmCard
