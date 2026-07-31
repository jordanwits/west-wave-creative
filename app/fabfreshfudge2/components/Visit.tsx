import { Facebook, Instagram, MapPin } from 'lucide-react'
import { EVENTS, type FudgeEvent } from '../data/events'
import { SITE } from '../data/site'
import Reveal from './Reveal'
import styles from './Visit.module.css'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function parse(d: string) {
  const [y, m, day] = d.split('-').map(Number)
  return { y, m: m - 1, day }
}

function dateRange(e: FudgeEvent) {
  const s = parse(e.start)
  if (!e.end) return { month: MONTHS[s.m], days: `${s.day}`, year: s.y }
  const en = parse(e.end)
  const days = s.m === en.m ? `${s.day}–${en.day}` : `${s.day} – ${MONTHS[en.m]} ${en.day}`
  return { month: MONTHS[s.m], days, year: s.y }
}

export default function Visit() {
  return (
    <section className={`section ${styles.section} on-dark grain`} id="visit">
      <div className="wrap">
        <Reveal className={styles.head}>
          <p className="kicker">2026 season</p>
          <h2 className={`display ${styles.title}`}>
            Find Us On The <span className="ital">Road.</span>
          </h2>
          <p className="lead">
            We pack up and bring the fudge to fairs and markets all over Northern
            California, Southern Oregon &amp; Northern Nevada. Here&apos;s where we&apos;ll be,
            come say hi and taste a few.
          </p>
        </Reveal>

        <ol className={styles.list}>
          {EVENTS.map((e, i) => {
            const d = dateRange(e)
            return (
              <Reveal key={e.start + e.name} delay={(i % 4) * 60}>
                <li className={`${styles.stop} ${e.featured ? styles.featured : ''}`}>
                  <span className={styles.idx}>{String(i + 1).padStart(2, '0')}</span>
                  <div className={styles.date}>
                    <span className={styles.days}>{d.days}</span>
                    <span className={styles.monthYear}>
                      {d.month} {d.year}
                    </span>
                  </div>
                  <div className={styles.info}>
                    <h3 className={styles.name}>{e.name}</h3>
                    <p className={styles.place}>
                      <MapPin size={13} aria-hidden="true" /> {e.venue} · {e.city}, {e.state}
                    </p>
                  </div>
                  {e.featured && <span className={styles.flag}>Full board</span>}
                </li>
              </Reveal>
            )
          })}
        </ol>

        <Reveal className={styles.foot}>
          <div>
            <h3 className={styles.footTitle}>Don&apos;t See Your Town?</h3>
            <p className={styles.footText}>
              Our schedule grows all season, and we take suggestions. Follow along for new
              dates, or email us about an event we should be at.
            </p>
          </div>
          <div className={styles.social}>
            <a href={SITE.facebook} target="_blank" rel="noreferrer" className={styles.socialBtn}>
              <Facebook size={18} /> Facebook
            </a>
            <a href={SITE.instagram} target="_blank" rel="noreferrer" className={styles.socialBtn}>
              <Instagram size={18} /> Instagram
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
