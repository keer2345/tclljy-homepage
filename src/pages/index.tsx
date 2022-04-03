import KeerCarouselImage from '@/components/KeerCarouselImage'
import styles from './index.less'

export default function IndexPage() {
  return (
    <div>
      <h1 className={styles.title}>
        <KeerCarouselImage />
        Page index
      </h1>
    </div>
  )
}
