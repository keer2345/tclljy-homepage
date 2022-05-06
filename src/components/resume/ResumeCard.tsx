import React from 'react'
import { Tag, Card, Row, Col } from 'antd'
import { Link, history } from 'umi'
import './ResumeCard.css'

const ResumeCard = ({ item }) => {
  const url = '/resume/info/' + item.id
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
          <Link to={url}>
            {item.gender != '2' && (
              <span style={{ color: '#0081ff' }}>{item.name} 先生</span>
            )}
            {item.gender == '2' && (
              <span style={{ color: 'purple' }}>{item.name} 女士</span>
            )}
          </Link>
        }
        extra={<span className="extra">{item.age}岁</span>}
        hoverable={true}
        bordered={false}
        onClick={() => history.push(url)}
      >
        <Row>
          <Tag color="cyan" className="row-bottom">
            {item.educational.id == '1' ? '学历未填' : item.educational.name}
          </Tag>
          <Tag color="green" className="row-bottom">
            {item.experience.id == 1 ? '经验未填' : item.experience.name}
          </Tag>
          {item.profession && (
            <Tag color="volcano" className="row-bottom">
              专业：{item.profession}
            </Tag>
          )}
        </Row>

        <Row className="row-bottom card-row">
          <Col span={24}>
            <Tag color="blue">期望职位</Tag>
            {item.categories.length != 0
              ? item.categories.map((category, i, item) => {
                  if (i + 1 === item.length) {
                    return <span>{category.name}</span>
                  } else {
                    return <span>{category.name}、</span>
                  }
                })
              : '（未填）'}
          </Col>
        </Row>
      </Card>
    </Col>
  )
}

export default ResumeCard
