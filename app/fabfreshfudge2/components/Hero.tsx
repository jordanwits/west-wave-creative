import { ArrowRight } from 'lucide-react'
import { FLAVORS } from '../data/flavors'
import { SITE } from '../data/site'
import styles from './Hero.module.css'

// Real photos for the filmstrip — the appetite-first first impression.
const STRIP = FLAVORS.filter((f) => f.photo)

export default function Hero() {
  return (
    <section className={`${styles.hero} on-dark`} id="top">
<div className={`wrap ${styles.inner}`}>
        <p className={`kicker ${styles.kick} ${styles.a1}`}>
          Est. {SITE.est} · Made in Mt. Shasta, CA
        </p>

        <h1 className={`display ${styles.title}`}>
          <span className={styles.a2}>Hand-Cut Fudge,</span>{' '}
          <span className={`ital ${styles.accent} ${styles.a3}`}>Fresh From The Mountain.</span>
        </h1>

        <p className={`lead ${styles.lead} ${styles.a4}`}>
          Bryan &amp; Becca Ragle stir small batches in Northern California, then take
          them on the road to fairs across the North State, Southern Oregon &amp; Nevada.
          Read the board, then build a box of your six favorites.
        </p>

        <div className={`${styles.ctas} ${styles.a5}`}>
          <a href="#build" className="btn btn-lg">
            Build a box <ArrowRight size={18} />
          </a>
          <a href="#board" className="link">
            Featured Flavors
          </a>
        </div>

        <ul className={`${styles.meta} ${styles.a6}`}>
          <li>{FLAVORS.length} flavors, cut fresh</li>
          <li>Find us at county fairs across the North State</li>
        </ul>
      </div>

      {/* full-bleed photo filmstrip */}
      <div className={`${styles.strip} ${styles.a7}`} aria-label="A look at the flavor board">
        <div className={styles.track}>
          {[...STRIP, ...STRIP].map((f, i) => (
            <figure className={styles.frame} key={f.id + i} aria-hidden={i >= STRIP.length}>
              <img src={f.photo} alt={i < STRIP.length ? `${f.name} fudge` : ''} loading={i < 6 ? 'eager' : 'lazy'} />
              <figcaption className={styles.frameCap}>
                <span className={styles.frameNum}>{String((i % STRIP.length) + 1).padStart(2, '0')}</span>
                {f.name}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
