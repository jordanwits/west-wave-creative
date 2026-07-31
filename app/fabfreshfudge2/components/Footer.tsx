import { useState } from 'react'
import { Facebook, Instagram, Mail, MapPin, Snowflake, ArrowRight } from 'lucide-react'
import { NAV, SITE } from '../data/site'
import styles from './Footer.module.css'

export default function Footer() {
  const [email, setEmail] = useState('')

  function subscribe(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    window.location.href =
      `mailto:${SITE.email}?subject=${encodeURIComponent('Add me to your list')}` +
      `&body=${encodeURIComponent(`Please add me to the Fab Fresh Fudge list: ${email}`)}`
  }

  return (
    <footer className={`on-dark ${styles.footer}`}>
      <div className="wrap">
        <div className={styles.brand}>
          <img src="/fabfreshfudge2/brand/logo.png" alt="Fab Fresh Fudge" className={styles.logo} />
          <span className={styles.wordmark}>
            Fab Fresh <span className="ital">Fudge</span>
          </span>
        </div>
        <p className={styles.tagline}>{SITE.tagline}.</p>

        <hr className={styles.rule} />

        <div className={styles.cols}>
          <nav className={styles.col} aria-label="Footer">
            <h3 className={styles.colTitle}>Explore</h3>
            <ul className={styles.links}>
              {NAV.map((n) => (
                <li key={n.href}>
                  <a href={n.href}>{n.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.col}>
            <h3 className={styles.colTitle}>Good To Know</h3>
            <ul className={styles.info}>
              <li>
                <MapPin size={15} /> On the road across NorCal, S. Oregon &amp; N. Nevada
              </li>
              <li>
                <Snowflake size={15} /> Ships October–April (heat-sensitive)
              </li>
              <li>
                <Mail size={15} />{' '}
                <a href={`mailto:${SITE.email}`} className={styles.emailLink}>
                  {SITE.email}
                </a>
              </li>
            </ul>
          </div>

          <div className={styles.col}>
            <h3 className={styles.colTitle}>Stay In The Loop</h3>
            <p className={styles.newsText}>New flavors and where we&apos;ll be next.</p>
            <form className={styles.form} onSubmit={subscribe}>
              <label htmlFor="news-email" className="sr-only">
                Email address
              </label>
              <input
                id="news-email"
                type="email"
                required
                placeholder="you@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
              />
              <button type="submit" className={styles.submit} aria-label="Sign up">
                <ArrowRight size={17} />
              </button>
            </form>
            <div className={styles.social}>
              <a href={SITE.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className={styles.soc}>
                <Instagram size={18} />
              </a>
              <a href={SITE.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className={styles.soc}>
                <Facebook size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>
            © {new Date().getFullYear()} {SITE.name} · {SITE.legalName}. All rights reserved.
          </p>
          <p className={styles.credit}>
            Site by{' '}
            <a href="https://westwavecreative.com" target="_blank" rel="noreferrer">
              West Wave Creative
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
