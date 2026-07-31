import { Hand, Mountain, Users } from 'lucide-react'
import { SITE } from '../data/site'
import Reveal from './Reveal'
import styles from './Story.module.css'

const VALUES = [
  { icon: Hand, label: 'Cut by hand' },
  { icon: Users, label: 'Family-run since 2022' },
  { icon: Mountain, label: 'Made in the North State' },
]

export default function Story() {
  return (
    <section className={`section ${styles.section}`} id="story">
      <div className="wrap">
        <Reveal className={styles.head}>
          <p className="kicker">Our story · Est. {SITE.est}</p>
          <h2 className={`display ${styles.title}`}>
            Meet The Ragles, Your <span className="ital">Fudge Family.</span>
          </h2>
        </Reveal>

        <Reveal className={styles.figure}>
          <img
            src="/fabfreshfudge2/photos/Ragles.webp"
            alt="Bryan and Becca Ragle, the family behind Fab Fresh Fudge."
            className={styles.photo}
            loading="lazy"
          />
          <figcaption className={styles.caption}>
            <span className={styles.est}>Est. {SITE.est}</span>
          </figcaption>
        </Reveal>

        <div className={styles.body}>
          <Reveal className={styles.aside}>
            <blockquote className={styles.pull}>
              “We love what we do and enjoy sharing our quality products with all of you.”
            </blockquote>
            <p className={styles.sign}>— Team Ragle</p>
          </Reveal>

          <Reveal className={styles.prose} delay={80}>
            <p>
              Fab Fresh Fudge is the Ragle family&apos;s fourth act. Bryan &amp; Becca took it
              on in {SITE.est}, rolled up their sleeves, and haven&apos;t looked back since.
            </p>
            <p>
              You may already know us. Over the years we&apos;ve sold Cutco cutlery and
              doTERRA oils, and we still run Best Tutors Ever. Some folks call us
              &ldquo;seasoned entrepreneurs.&rdquo; Mostly we just love good work and good
              people, which these days means stirring small batches of fudge and packing up
              for fairs and markets across Northern California, Southern Oregon &amp;
              Northern Nevada.
            </p>
            <p>
              Every batch is cut fresh, never mass-produced, and made the way fudge should
              be: by hand, with real ingredients, by folks who will probably hand it to you
              themselves. We can&apos;t wait to share it with you.
            </p>

            <ul className={styles.values}>
              {VALUES.map((v) => (
                <li key={v.label}>
                  <v.icon size={16} aria-hidden="true" />
                  {v.label}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
