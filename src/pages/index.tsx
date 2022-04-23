import KrCarouselImage from '@/components/KrCarouselImage'
import KrSearch from '@/components/KrSearch'
import styles from './index.less'
import { Row, Col, Card } from 'antd'
import KrLoginNav from '@/components/KrLoginNav'
import JobCategory from '@/components/job/JobCategory'

export default function IndexPage() {
  return (
    <>
      <KrCarouselImage />
      <Card size="middle">
        <Row>
          <Col span={14} offset={4}>
            <KrSearch />
          </Col>
          <Col span={6} offset={0}>
            <Row justify="end">
              <KrLoginNav />
            </Row>
          </Col>
        </Row>
        {/* <Row>　</Row> */}
        <Row>
          <JobCategory />
        </Row>
      </Card>
    </>
  )
}
