"use client"

import Header from "./components/Header"
import Hero from "./components/Hero"
import Board from "./components/Board"
import BuildABox from "./components/BuildABox"
import Story from "./components/Story"
import Reviews from "./components/Reviews"
import Visit from "./components/Visit"
import Gifts from "./components/Gifts"
import Footer from "./components/Footer"

export default function FabFreshFudge2() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Board />
        <BuildABox />
        <Story />
        <Reviews />
        <Visit />
        <Gifts />
      </main>
      <Footer />
    </>
  )
}
