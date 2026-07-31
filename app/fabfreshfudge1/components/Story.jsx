import { useReveal } from '../hooks/useReveal.js'

const STORY_IMG = '/fabfreshfudge1/images/story-1.jpg'
const STORY_IMG_2 = '/fabfreshfudge1/images/story-2.jpg'

export default function Story() {
  const ref = useReveal()

  return (
    <section className="story" id="our-story" ref={ref}>
      <div className="container story-grid">
        <div className="story-photos" data-reveal>
          <div className="story-arch">
            <img
              src={STORY_IMG}
              alt="Warm chocolate being poured over a fresh batch, mid-stir"
              loading="lazy"
              width="900"
              height="1350"
            />
          </div>
          <div className="story-photo-small">
            <img
              src={STORY_IMG_2}
              alt="A tray of hand-rolled chocolate, dusted and ready for the case"
              loading="lazy"
              width="700"
              height="930"
            />
          </div>
        </div>

        <div className="story-copy" data-reveal>
          <h2>Stirred by hand, sold by name</h2>
          <p className="story-lede">
            Fabulous Fudge started the way the best food businesses do, with
            a family recipe, a copper pot, and a folding table at the local
            fair.
          </p>
          <p>
            We still make every batch the slow way: real butter, real cream,
            stirred by hand until it sets up smooth and never grainy. The
            walnuts go in by hand. The caramel gets its pinch of salt by hand.
            And when a flavor isn’t right, it doesn’t leave the kitchen.
          </p>
          <p>
            What began as one chocolate recipe is now twenty-some flavors,
            because customers kept asking <em>“could you make a…?”</em> and we
            kept saying yes. If you’ve got an idea for the next one, find us
            at a show and tell us.
          </p>
          <ul className="story-facts">
            <li>
              <strong>20+</strong>
              <span>flavors on the slab</span>
            </li>
            <li>
              <strong>Small</strong>
              <span>batches, stirred by hand</span>
            </li>
            <li>
              <strong>Fresh</strong>
              <span>cut to order &amp; shipped fast</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
