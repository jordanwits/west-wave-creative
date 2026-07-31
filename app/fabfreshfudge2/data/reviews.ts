// This file used to hold three invented customer testimonials. The Ragles have no
// public rating yet (their Facebook page reads "Not yet rated"), so quoting
// customers here would have been fabricated social proof.
//
// What follows are claims we can actually source, all from the Ragles' own words:
//   - "We make our fudge FRESH!"                      fabfreshfudge.com/home
//   - "REAL Peanut Butter" / "REAL coffee" / "hand mixed in"
//                                                     Square item descriptions
//   - "proudly owned (& made) by Bryan & Becca Ragle ... we travel around the
//      North State selling our 20+ flavors at small county fairs"
//                                                     facebook.com/fabfreshfudge
//
// When the Ragles supply real reviews, add them as their own section rather than
// replacing these.

export interface ProofPoint {
  /** short label, rendered as the card heading */
  title: string
  /** the claim itself, in the brand's first-person voice */
  text: string
}

export const PROOF: ProofPoint[] = [
  {
    title: 'Fresh, Never Mass-Produced',
    text: 'Small batches, cooked and cut by hand. Fresh is the whole reason this business exists.',
  },
  {
    title: 'Real Ingredients, Mixed By Hand',
    text: 'Real peanut butter. Real coffee. Walnuts, Skor bits and mini marshmallows folded in by hand, then garnished on top.',
  },
  {
    title: 'Handed To You By The Folks Who Made It',
    text: 'We make every batch ourselves, then bring it to county fairs and local events across the North State.',
  },
]
