import { Facebook, Instagram } from 'lucide-react'
import { PROOF } from '../data/reviews'
import { SITE } from '../data/site'
import Reveal from './Reveal'
import styles from './Reviews.module.css'

export default function Reviews() {
  return (
    <section className={`section ${styles.section}`} id="reviews" aria-label="How we make it">
      <div className="wrap">
        <Reveal className={styles.head}>
          <p className="kicker">How we make it</p>
          <h2 className={`h1 ${styles.title}`}>
            Fresh Is The Whole <span className="ital">Point.</span>
          </h2>
        </Reveal>

        <div className={styles.grid}>
          {PROOF.map((p, i) => (
            <Reveal key={p.title} delay={(i % 3) * 80}>
              <figure className={styles.card}>
                <h3 className={styles.pointTitle}>{p.title}</h3>
                <p className={styles.quote}>{p.text}</p>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal className={styles.foot}>
          <p className={styles.footText}>
            Over 550 folks follow along for new batches and show dates.
          </p>
          <div className={styles.social}>
            <a href={SITE.facebook} target="_blank" rel="noreferrer" className={styles.socialBtn}>
              <Facebook size={17} /> Facebook
            </a>
            <a href={SITE.instagram} target="_blank" rel="noreferrer" className={styles.socialBtn}>
              <Instagram size={17} /> Instagram
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
