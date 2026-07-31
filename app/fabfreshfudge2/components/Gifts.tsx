import { Mail, ArrowRight } from 'lucide-react'
import { SITE } from '../data/site'
import Reveal from './Reveal'
import styles from './Gifts.module.css'

// Kept deliberately non-committal: the Ragles' store lists a "Bulk Ordering"
// category but publishes no bulk pricing, branding, or fulfillment terms, so this
// section invites a conversation instead of promising a service.
const OPTIONS = [
  {
    title: 'Gift Boxes',
    text: 'Pick the flavors, we hand-cut and box them. Buy five squares and the sixth is on us.',
  },
  {
    title: 'Ordering For A Crowd',
    text: 'Office, party, or a whole event? Tell us roughly how many you need and when, and we will sort out the details with you.',
  },
  {
    title: 'Flavor Requests',
    text: 'Want something we do not make yet? We are always open to suggestions. We cannot promise every one, but we do consider them.',
  },
]

const inquiry =
  `mailto:${SITE.email}?subject=${encodeURIComponent('Bulk / gift order question')}` +
  `&body=${encodeURIComponent(
    "Hi Bryan & Becca,\n\nI'd like to ask about a larger order. Here's what I have in mind:\n\n• Roughly how many squares or boxes:\n• Flavors (if you know yet):\n• Need-by date:\n• Where you're located:\n\nThanks!",
  )}`

export default function Gifts() {
  return (
    <section className={`section ${styles.section}`} id="gifts">
      <div className="wrap">
        <div className={styles.top}>
          <Reveal className={styles.intro}>
            <p className="kicker">Gifts &amp; wholesale</p>
            <h2 className={`h1 ${styles.title}`}>
              Thank Them With Something They&apos;ll <span className="ital">Actually Remember.</span>
            </h2>
            <p className="lead">
              Skip the gift card. Hand-made fudge from a real family business is the kind of
              thank-you people actually talk about. Tell us what you need and we&apos;ll work
              out the flavors, the count, and the timing with you.
            </p>
          </Reveal>

          <Reveal className={styles.cta} delay={80}>
            <a href={inquiry} className="btn btn-lg">
              <Mail size={18} /> Plan your gift list
            </a>
            <a href={inquiry} className={styles.email}>
              {SITE.email} <ArrowRight size={14} />
            </a>
            <p className={styles.note}>Not sure what you need yet? Email us anyway and we&apos;ll figure it out together.</p>
          </Reveal>
        </div>

        <ol className={styles.options}>
          {OPTIONS.map((o, i) => (
            <Reveal key={o.title} delay={i * 70}>
              <li className={styles.option}>
                <span className={styles.optNum}>{String(i + 1).padStart(2, '0')}</span>
                <h3 className={styles.optTitle}>{o.title}</h3>
                <p className={styles.optText}>{o.text}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
