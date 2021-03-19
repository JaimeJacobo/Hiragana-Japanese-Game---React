import React from 'react'
import './Home.scss'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="Home">
      <h2>Hiragana Game</h2>
      <div className="link">
        <Link to="/hiragana/letters">Play with letters</Link>
      </div>
      <div className="link">
        <Link to="/hiragana/words">Play with words (soon)</Link>
      </div>
      <h2>Katakana Game</h2>
      <div className="link">
        <Link to="/katakana/letters">Play with letters</Link>
      </div>
      <div className="link">
        <Link to="/words">Play with words (soon)</Link>
      </div>
      <h2>Kanjis Game</h2>
      <div className="link">
        <Link to="/kanji">Play with letters</Link>
      </div>
      <div className="link">
        <Link to="/words">Play with words (soon)</Link>
      </div>
    </div>
  )
}

export default Home
