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
      <h2>Katakana Game</h2>
      <div className="link">
        <Link to="/katakana/letters">Play with letters</Link>
      </div>
      <h2>Kanjis Game</h2>
      <div className="link">
        <Link to="/kanji">Play with Kanjis</Link>
      </div>
      <h2>Words Game (En to jap)</h2>
      <div className="link">
        <Link to="/wordsEnToJap">Play with words</Link>
      </div>
      <h2>Words Game (Jap to en)</h2>
      <div className="link">
        <Link to="/wordsJapToEn">Play with words</Link>
      </div>
    </div>
  )
}

export default Home
