import KeerCarouselImage from '@/components/KeerCarouselImage'
import KeerSearch from '@/components/KeerSearch'
import styles from './index.less'
import { Row, Col, Card } from 'antd'

export default function IndexPage() {
  return (
    <>
      <KeerCarouselImage />
      <Card size="middle">
        <Row>
          <Col span={18} offset={6}>
            <KeerSearch />
          </Col>
        </Row>
      </Card>
    </>
  )
}
