import { ArrowRight } from 'lucide-react'
import { BOX, CATEGORIES, FLAVORS, flavorById, type Flavor } from '../data/flavors'
import { SITE } from '../data/site'
import Reveal from './Reveal'
import styles from './Board.module.css'

const FEATURE_IDS = ['dark-chocolate-raspberry', 'salted-caramel', 'peanut-butter-chocolate']
const FEATURES = FEATURE_IDS.map((id) => flavorById(id)).filter(Boolean) as Flavor[]

function Thumb({ f }: { f: Flavor }) {
  return f.photo ? (
    <img className={styles.thumb} src={f.photo} alt="" loading="lazy" />
  ) : (
    <span className={styles.thumb} style={{ background: f.color }} aria-hidden="true">
      <svg viewBox="0 0 40 34" fill="none">
        <path d="M2 31.5 L14.5 7 L20 16.5 L24.5 8.5 L38 31.5 Z" fill="oklch(1 0 0 / 0.55)" />
      </svg>
    </span>
  )
}

export default function Board() {
  return (
    <section className={`section ${styles.section}`} id="board">
      <div className="wrap">
        <Reveal className="section-head">
          <p className="kicker">The board · {FLAVORS.length} flavors</p>
          <h2 className={`display ${styles.title}`}>
            Featured <span className="ital">Flavors</span>
          </h2>
          <p className="lead">
            We stir small batches by hand and add new flavors when a good suggestion comes
            along. Here&apos;s the whole thing, house favorites up top, the full list below.
          </p>
        </Reveal>

        {/* House favorites — large alternating editorial rows */}
        <div className={styles.features}>
          {FEATURES.map((f) => (
            <Reveal key={f.id} className={styles.feature}>
              <figure className={styles.featMedia}>
                <img
                  src={f.photo}
                  alt={`${f.name} fudge`}
                  loading="lazy"
                  className={f.id === 'dark-chocolate-raspberry' ? styles.featImgTop : undefined}
                />
              </figure>
              <div className={styles.featBody}>
                <div className={styles.featTags}>
                  <span className="tag tag-berry">House favorite</span>
                  {f.note && <span className="tag">{f.note}</span>}
                </div>
                <h3 className={styles.featName}>{f.name}</h3>
                <p className={styles.featDesc}>{f.desc}</p>
                <span className={styles.featCat}>{f.category}</span>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Full board — typeset menu, grouped by category */}
        <Reveal className={styles.menuHead}>
          <h3 className={styles.menuTitle}>The Full Board</h3>
          <span className={styles.menuNote}>
            1/4 lb squares, ${BOX.perSquare} each · buy 5, get the 6th free
          </span>
        </Reveal>

        <div className={styles.menu}>
          {CATEGORIES.map((cat) => {
            const items = FLAVORS.filter((f) => f.category === cat)
            if (!items.length) return null
            return (
              <section className={styles.group} key={cat} aria-label={cat}>
                <div className={styles.groupHead}>
                  <span className={styles.groupName}>{cat}</span>
                  <span className={styles.groupCount}>
                    {String(items.length).padStart(2, '0')}
                  </span>
                </div>
                <ul className={styles.rows}>
                  {items.map((f) => (
                    <li className={styles.row} key={f.id}>
                      <Thumb f={f} />
                      <span className={styles.rowName}>
                        {f.name}
                        {f.isNew && <span className={styles.new}>New</span>}
                      </span>
                      <span className={styles.leader} aria-hidden="true" />
                      {f.note && <span className={styles.rowNote}>{f.note}</span>}
                    </li>
                  ))}
                </ul>
              </section>
            )
          })}
        </div>

        <div className={styles.ctas}>
          <a href="#build" className="btn btn-lg">
            Build a {BOX.maxFlavors}-flavor box <ArrowRight size={18} />
          </a>
          <a href={SITE.fudgeUrl} target="_blank" rel="noreferrer" className="btn btn-lg btn-line">
            Shop every flavor
          </a>
        </div>
      </div>
    </section>
  )
}
