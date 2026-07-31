"use client"

import { useCallback, useState } from "react"
import { BOX_SIZE } from "./data/flavors.js"
import Header from "./components/Header.jsx"
import Hero from "./components/Hero.jsx"
import Shop from "./components/Shop.jsx"
import Specials from "./components/Specials.jsx"
import BuildABox from "./components/BuildABox.jsx"
import Story from "./components/Story.jsx"
import Reviews from "./components/Reviews.jsx"
import Events from "./components/Events.jsx"
import Corporate from "./components/Corporate.jsx"
import Footer from "./components/Footer.jsx"
import BoxPill from "./components/BoxPill.jsx"

export default function FabFreshFudge1() {
  // The six-pack box: an ordered list of flavor ids (duplicates allowed).
  const [box, setBox] = useState<string[]>([])
  const [bump, setBump] = useState(0) // pulses the floating pill on add

  const addToBox = useCallback((id: string) => {
    let added = false
    setBox((prev) => {
      if (prev.length >= BOX_SIZE) return prev
      added = true
      return [...prev, id]
    })
    setBump((b) => b + 1)
    return added
  }, [])

  const removeFromBox = useCallback((index: number) => {
    setBox((prev) => prev.filter((_, i) => i !== index))
  }, [])

  const clearBox = useCallback(() => setBox([]), [])

  return (
    <>
      <Header boxCount={box.length} />
      <main id="main">
        <Hero />
        <Shop onAdd={addToBox} boxFull={box.length >= BOX_SIZE} />
        <Specials />
        <BuildABox
          box={box}
          onAdd={addToBox}
          onRemove={removeFromBox}
          onClear={clearBox}
        />
        <Story />
        <Reviews />
        <Events />
        <Corporate />
      </main>
      <Footer />
      <BoxPill count={box.length} bump={bump} />
    </>
  )
}
