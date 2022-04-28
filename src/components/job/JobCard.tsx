import React from 'react'
import { Tag, Card, Row, Col } from 'antd'
import './JobCard.css'
import { Link } from 'umi'

const JobCard = ({ item }) => {
  return (
    <Col span={8} className="site-col-border-less-wrapper">
      <Card
        size="small"
        title={<Link to="#">{item.name}</Link>}
        extra={
          <span className="extra">
            {item.mianyi ? '待遇面议' : item.minSalary + ' ~ ' + item.maxSalary}
          </span>
        }
        headStyle={{
          color: '#0081ff',
        }}
        hoverable={true}
        // style={{height:250}}
        bordered={false}
        actions={[
          <Row className="actions">
            <Col span={16}>
              <Row justify="start">
                <Col>
                  &nbsp;·
                  {item.firm.name.length >= 20
                    ? item.firm.name.substr(0, 19) + '...'
                    : item.firm.name}
                </Col>
              </Row>
            </Col>
            <Col span={1}></Col>
            <Col span={7}>
              <Row justify="end">
                <Col>
                  {/* <EnvironmentTwoTone twoToneColor="goldenrod" />
                  &nbsp; */}
                  {item.firm.region &&
                    item.firm.city.forShort + '·' + item.firm.region.forShort}
                  {!item.firm.region &&
                    item.firm.province.forShort + '·' + item.firm.city.forShort}
                  &nbsp; &nbsp;
                </Col>
              </Row>
            </Col>
          </Row>,
        ]}
      >
        <Row>
          {item.jobType.name === '正式工' && (
            <Tag color="#e03997" className="row-bottom">
              {item.jobType.name}
            </Tag>
          )}
          {item.jobType.name === '小时工' && (
            <Tag color="pink" className="row-bottom">
              {item.jobType.name}
            </Tag>
          )}
          {item.jobType.name === '临时工' && (
            <Tag color="brown" className="row-bottom">
              {item.jobType.name}
            </Tag>
          )}
          <Tag color="orangered" className="row-bottom">
            {item.jobCategory.name}
          </Tag>
          <Tag color="volcano" className="row-bottom">
            {item.educational.id == '1' ? '学历不限' : item.educational.name}
          </Tag>
          <Tag color="orange" className="row-bottom">
            {item.experience.id == 1 ? '经验不限' : item.experience.name}
          </Tag>
        </Row>
        {item.weal && (
          <Row className="row-bottom card-row">
            <Col span={24}>
              <Tag color="purple">福利</Tag>
              {item.weal.length >= 20
                ? item.weal.substr(0, 19) + '...'
                : item.weal}
            </Col>
          </Row>
        )}
        {item.zwld && (
          <Row className="row-bottom card-row">
            <Col span={24}>
              <Tag color="purple">亮点</Tag>
              {item.zwld.length >= 20
                ? item.zwld.substr(0, 19) + '...'
                : item.zwld}
            </Col>
          </Row>
        )}
        {item.chizhu && (
          <Row className="row-bottom card-row">
            <Col span={24}>
              <Tag color="purple">吃住</Tag>
              {item.chizhu.length >= 20
                ? item.chizhu.substr(0, 19) + '...'
                : item.chizhu}
            </Col>
          </Row>
        )}
        {!item.weal && (
          <Row className="row-bottom card-row">
            <Col>&nbsp;</Col>
          </Row>
        )}
        {!item.zwld && (
          <Row className="row-bottom card-row">
            <Col>&nbsp;</Col>
          </Row>
        )}
        {!item.chizhu && (
          <Row className="row-bottom card-row">
            <Col>&nbsp;</Col>
          </Row>
        )}
      </Card>
    </Col>
  )
}

export default JobCard