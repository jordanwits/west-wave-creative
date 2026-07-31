import { useEffect, useState } from 'react'
import { Menu, X, Instagram, Facebook } from 'lucide-react'
import { NAV, SITE } from '../data/site'
import styles from './Header.module.css'

const SECTION_IDS = ['top', ...NAV.map((n) => n.href.slice(1))]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('top')

  // Shadow once you leave the hero top.
  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 16)
        ticking = false
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Scrollspy — highlight the section in view.
  useEffect(() => {
    const els = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    if (!('IntersectionObserver' in window) || !els.length) return
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (vis) setActive(vis.target.id)
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.25, 0.5] },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  // Drawer: lock scroll + close on Escape.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`wrap ${styles.bar}`}>
        <a href="#top" className={styles.brand} aria-label={`${SITE.name} — home`}>
          <img src="/fabfreshfudge2/brand/logo.png" alt={SITE.name} className={styles.logo} width="48" height="48" />
        </a>

        <nav className={styles.nav} aria-label="Primary">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className={`${styles.link} ${active === n.href.slice(1) ? styles.linkOn : ''}`}
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className={styles.actions}>
          <a href="#build" className={`btn ${styles.cta}`}>
            Build a Box
          </a>
          <button
            type="button"
            className={styles.burger}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="nav-drawer"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`${styles.backdrop} ${open ? styles.backdropOpen : ''}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
      <div
        id="nav-drawer"
        className={`${styles.drawer} ${open ? styles.drawerOpen : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        aria-hidden={!open}
      >
        <nav className={styles.drawerNav} aria-label="Mobile">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className={styles.drawerLink}
              onClick={() => setOpen(false)}
              tabIndex={open ? 0 : -1}
            >
              <span className={styles.drawerIndex}>{n.index}</span>
              {n.label}
            </a>
          ))}
        </nav>
        <div className={styles.drawerFoot}>
          <a href="#build" className="btn btn-lg" onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
            Build a Box
          </a>
          <div className={styles.drawerSocial}>
            <a href={SITE.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" tabIndex={open ? 0 : -1}>
              <Instagram size={20} />
            </a>
            <a href={SITE.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" tabIndex={open ? 0 : -1}>
              <Facebook size={20} />
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
