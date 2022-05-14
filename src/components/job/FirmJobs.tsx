import React from 'react'
import { List, Tag, Card, Row, Col, Button, Link } from 'antd'
import { history } from 'umi'

const FirmJobs = ({ firmJobsList, firmJobsCount, firmid }) => {
  return (
    <Card
      title="企业职位"
      extra={
        <Button
          type="link"
          onClick={() => history.push('/company/info/' + firmid + '#jobs')}
        >
          更多 ( {firmJobsCount} )
        </Button>
      }
    >
      <List
        itemLayout="horizontal"
        dataSource={firmJobsList}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              // avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
              // title={<a href="https://ant.design">{item.name}</a>}
              // title={<Link to={'job/info/' + item.id}>{item.name}</Link>}
              title={<a href={'/job/info/' + item.id}>{item.name}</a>}
              description={
                item.jobType.name +
                '、' +
                item.jobCategory.name +
                '、' +
                (item.mianyi
                  ? '待遇面议'
                  : item.minSalary + ' ~ ' + item.maxSalary)
              }
            />
          </List.Item>
        )}
      />
    </Card>
  )
}

export default FirmJobs
