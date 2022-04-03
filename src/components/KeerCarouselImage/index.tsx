import React from 'react'

import { Carousel, Image, Row, Col } from 'antd'
import styles from './index.less'

const carouselStyle = {
  height: '460px',
}

const KeerCarouselImage = () => {
  return (
    <Carousel autoplay style={carouselStyle}>
      <img
        className={styles.image}
        src="https://636c-cloud-4gloc88m08adcddf-1307495423.tcb.qcloud.la/images/miniapp/logo.png"
      />
      <img
        className={styles.image}
        src="https://636c-cloud-4gloc88m08adcddf-1307495423.tcb.qcloud.la/images/miniapp/logo2.jpg"
      />

      <img
        className={styles.image}
        src="https://636c-cloud-4gloc88m08adcddf-1307495423.tcb.qcloud.la/images/miniapp/1.png?"
      />
      <img
        className={styles.image}
        src="https://636c-cloud-4gloc88m08adcddf-1307495423.tcb.qcloud.la/images/miniapp/2.png"
      />
      <img
        className={styles.image}
        src="https://636c-cloud-4gloc88m08adcddf-1307495423.tcb.qcloud.la/images/miniapp/3.png"
      />
      {/* <Image
        className={styles.image}
        preview={false}
        src="https://636c-cloud-4gloc88m08adcddf-1307495423.tcb.qcloud.la/images/miniapp/logo.png"
      />
      <Image
        className={styles.image}
        preview={false}
        src="https://636c-cloud-4gloc88m08adcddf-1307495423.tcb.qcloud.la/images/miniapp/logo2.jpg"
      /> */}

      {/* <Image
              preview={false}
              src="https://636c-cloud-4gloc88m08adcddf-1307495423.tcb.qcloud.la/images/miniapp/1.png?"
            />
            <Image
              preview={false}
              src="https://636c-cloud-4gloc88m08adcddf-1307495423.tcb.qcloud.la/images/miniapp/2.png"
            />
            <Image
              preview={false}
              src="https://636c-cloud-4gloc88m08adcddf-1307495423.tcb.qcloud.la/images/miniapp/3.png"
            /> */}
    </Carousel>
  )
}

export default KeerCarouselImage
