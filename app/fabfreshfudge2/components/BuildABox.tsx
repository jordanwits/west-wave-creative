import { useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Check, Plus, X, Mail, ShoppingBag } from 'lucide-react'
import { BOX, FLAVORS, type Flavor } from '../data/flavors'
import { SITE } from '../data/site'
import Reveal from './Reveal'
import styles from './BuildABox.module.css'

const MAX = BOX.maxFlavors

export default function BuildABox() {
  const [selected, setSelected] = useState<string[]>([])
  const [bumpFull, setBumpFull] = useState(false)
  const reduce = useReducedMotion()

  const byId = useMemo(() => new Map(FLAVORS.map((f) => [f.id, f])), [])
  const chosen = selected.map((id) => byId.get(id)!).filter(Boolean)
  const count = selected.length
  const full = count >= MAX
  const remaining = MAX - count

  function toggle(id: string) {
    setSelected((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id)
      if (prev.length >= MAX) {
        flashFull()
        return prev
      }
      return [...prev, id]
    })
  }

  function flashFull() {
    if (reduce) return
    setBumpFull(true)
    window.setTimeout(() => setBumpFull(false), 480)
  }

  const slots: (Flavor | null)[] = Array.from({ length: MAX }, (_, i) => chosen[i] ?? null)

  const mailHref = useMemo(() => {
    const lines = chosen.map((f, i) => `${i + 1}. ${f.name}`).join('%0D%0A')
    const body =
      `Hi Bryan & Becca,%0D%0A%0D%0AI'd like to order ${BOX.title} (${BOX.pieceNote}) with:%0D%0A` +
      `${lines || '(still deciding!)'}%0D%0A%0D%0AThank you!`
    return `mailto:${SITE.email}?subject=${encodeURIComponent('Six-Pack Box order')}&body=${body}`
  }, [chosen])

  return (
    <section className={`section on-dark ${styles.section}`} id="build">
      <div className="wrap">
        <Reveal className="section-head">
          <p className="kicker">Make it yours</p>
          <h2 className={`display ${styles.title}`}>
            Build Your <span className="ital">Six-Pack.</span>
          </h2>
          <p className="lead">
            Pick up to six flavors and we&apos;ll hand-cut a fresh box just for you.
            Squares are ${BOX.perSquare} each, and when you buy five the sixth is on us,
            so a full box lands at ${BOX.price}. Mix the classics with something new;
            that&apos;s the whole point.
          </p>
        </Reveal>

        <div className={styles.layout}>
          {/* Picker */}
          <div className={styles.picker}>
            <div className={styles.pickerHead}>
              <span className={styles.pickerTitle}>Choose your flavors</span>
              <span className={styles.pickerHint}>
                {full ? 'Box full, tap one to swap' : `${remaining} ${remaining === 1 ? 'slot' : 'slots'} open`}
              </span>
            </div>
            <ul className={styles.tiles}>
              {FLAVORS.map((f) => {
                const isSel = selected.includes(f.id)
                const disabled = full && !isSel
                return (
                  <li key={f.id}>
                    <motion.button
                      type="button"
                      className={`${styles.tile} ${isSel ? styles.tileOn : ''}`}
                      aria-pressed={isSel}
                      disabled={disabled}
                      onClick={() => toggle(f.id)}
                      whileTap={reduce ? undefined : { scale: 0.97 }}
                    >
                      <span className={styles.thumb} style={{ '--swatch': f.color } as React.CSSProperties}>
                        {f.photo ? <img src={f.photo} alt="" loading="lazy" /> : null}
                      </span>
                      <span className={styles.tileText}>
                        <span className={styles.tileName}>{f.name}</span>
                        <span className={styles.tileCat}>{f.category}</span>
                      </span>
                      <span className={styles.tileState} aria-hidden="true">
                        {isSel ? <Check size={15} /> : <Plus size={15} />}
                      </span>
                    </motion.button>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Order ticket */}
          <aside className={styles.ticketWrap} aria-label="Your order">
            <motion.div
              className={styles.ticket}
              animate={bumpFull && !reduce ? { x: [0, -6, 6, -4, 4, 0] } : { x: 0 }}
              transition={{ duration: 0.45 }}
            >
              <div className={styles.ticketHead}>
                <span className={styles.ticketBrand}>Fab Fresh Fudge</span>
                <span className={styles.ticketKind}>Order ticket</span>
              </div>
              <div className={styles.ticketSub}>
                <span>{BOX.title}</span>
                <span aria-live="polite">
                  {count}/{MAX}
                </span>
              </div>

              <ol className={styles.lines}>
                {slots.map((f, i) => (
                  <li key={i} className={`${styles.line} ${f ? styles.lineOn : ''}`}>
                    <span className={styles.lineNo}>{i + 1}</span>
                    <AnimatePresence mode="wait" initial={false}>
                      {f ? (
                        <motion.span
                          key={f.id}
                          className={styles.lineFlavor}
                          initial={reduce ? false : { opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={reduce ? { opacity: 0 } : { opacity: 0, x: 8 }}
                          transition={{ duration: 0.2 }}
                        >
                          <span className={styles.lineDot} style={{ '--swatch': f.color } as React.CSSProperties} />
                          {f.name}
                          <button
                            type="button"
                            className={styles.lineRemove}
                            onClick={() => toggle(f.id)}
                            aria-label={`Remove ${f.name}`}
                          >
                            <X size={13} />
                          </button>
                        </motion.span>
                      ) : (
                        <span className={styles.linePlaceholder}>choose a flavor</span>
                      )}
                    </AnimatePresence>
                  </li>
                ))}
              </ol>

              <div className={styles.ticketTotal}>
                <span>{BOX.pieceNote}</span>
                <span className={styles.totalPrice}>${BOX.price}.00</span>
              </div>
              <p className={styles.ticketPromo}>{BOX.promoNote}</p>

              <p className={styles.ticketMsg}>
                {count === 0
                  ? 'Tap flavors to fill your box.'
                  : full
                    ? 'Perfect six. Let’s get it boxed.'
                    : `Room for ${remaining} more, or order it just like this.`}
              </p>

              <div className={styles.actions}>
                <a
                  href={count > 0 ? mailHref : undefined}
                  className={`btn btn-lg ${styles.order} ${count === 0 ? styles.orderOff : ''}`}
                  aria-disabled={count === 0}
                  onClick={(e) => count === 0 && e.preventDefault()}
                >
                  <Mail size={18} /> Send my order
                </a>
                <div className={styles.subActions}>
                  <a href={SITE.shopUrl} target="_blank" rel="noreferrer" className={styles.shopLink}>
                    <ShoppingBag size={15} /> Shop on our store
                  </a>
                  {count > 0 && (
                    <button type="button" className={styles.clear} onClick={() => setSelected([])}>
                      Clear
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </aside>
        </div>
      </div>
    </section>
  )
}
