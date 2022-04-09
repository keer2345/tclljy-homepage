import KrCarouselImage from '@/components/KrCarouselImage'
import KrSearch from '@/components/KrSearch'
import styles from './index.less'
import { Row, Col, Card } from 'antd'

export default function IndexPage() {
  return (
    <>
      <KrCarouselImage />
      <Card size="middle">
        <Row>
          <Col span={18} offset={6}>
            <KrSearch />
          </Col>
        </Row>
      </Card>
    </>
  )
}
