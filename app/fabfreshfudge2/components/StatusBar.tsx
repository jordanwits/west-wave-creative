import { ArrowRight } from 'lucide-react'
import { SITE } from '../data/site'
import styles from './StatusBar.module.css'

const NOTES = [
  'In season — Dark Chocolate Raspberry & S’mores',
  'Tins & gift boxes ship October–April',
  'Find us live at fairs across the North State',
]

export default function StatusBar() {
  return (
    <aside className={styles.bar} aria-label="What's fresh right now">
      <div className={`wrap ${styles.inner}`}>
        <span className={styles.label}>
          <span className={styles.dot} aria-hidden="true" /> Now serving
        </span>
        <ul className={styles.notes}>
          {NOTES.map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>
        <a href={SITE.fudgeUrl} target="_blank" rel="noreferrer" className={styles.link}>
          What&apos;s fresh <ArrowRight size={14} />
        </a>
      </div>
    </aside>
  )
}
