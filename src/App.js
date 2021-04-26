import React from 'react'
import Home from './components/Home/Home'
import LettersGame from './components/LettersGame/LettersGame'
import { BrowserRouter as Router, Route } from 'react-router-dom'

//HIRAGANA
import hiragana_constant_letters from './json/hiragana/letters/constants.json'
import hiragana_h_letters from './json/hiragana/letters/h-letters.json'
import hiragana_k_letters from './json/hiragana/letters/k-letters.json'
import hiragana_m_letters from './json/hiragana/letters/m-letters.json'
import hiragana_n_letters from './json/hiragana/letters/n-letters.json'
import hiragana_r_letters from './json/hiragana/letters/r-letters.json'
import hiragana_s_letters from './json/hiragana/letters/s-letters.json'
import hiragana_t_letters from './json/hiragana/letters/t-letters.json'
import hiragana_w_letters from './json/hiragana/letters/w-letters.json'
import hiragana_y_letters from './json/hiragana/letters/y-letters.json'
import hiragana_g_letters from './json/hiragana/letters/g-letters.json'
import hiragana_z_letters from './json/hiragana/letters/z-letters.json'
import hiragana_d_letters from './json/hiragana/letters/d-letters.json'
import hiragana_b_letters from './json/hiragana/letters/b-letters.json'
import hiragana_p_letters from './json/hiragana/letters/p-letters.json'

//KATAKANA
import katakana_constant_letters from './json/katakana/letters/constants.json'
import katakana_h_letters from './json/katakana/letters/h-letters.json'
import katakana_k_letters from './json/katakana/letters/k-letters.json'
import katakana_m_letters from './json/katakana/letters/m-letters.json'
import katakana_n_letters from './json/katakana/letters/n-letters.json'
import katakana_r_letters from './json/katakana/letters/r-letters.json'
import katakana_s_letters from './json/katakana/letters/s-letters.json'
import katakana_t_letters from './json/katakana/letters/t-letters.json'
import katakana_w_letters from './json/katakana/letters/w-letters.json'
import katakana_y_letters from './json/katakana/letters/y-letters.json'
import katakana_g_letters from './json/katakana/letters/g-letters.json'
import katakana_z_letters from './json/katakana/letters/z-letters.json'
import katakana_d_letters from './json/katakana/letters/d-letters.json'
import katakana_b_letters from './json/katakana/letters/b-letters.json'
import katakana_p_letters from './json/katakana/letters/p-letters.json'

//KANJI
import kanjis_1_20 from './json/kanji/kanjis_1_20.json'
import kanjis_21_40 from './json/kanji/kanjis_21_40.json'
import kanjis_41_60 from './json/kanji/kanjis_41_60.json'
import kanjis_61_80 from './json/kanji/kanjis_61_80.json'
import kanjis_81_100 from './json/kanji/kanjis_81_100.json'
import own_kanjis from './json/kanji/own_kanjis.json'
import own_kanjis_2 from './json/kanji/own_kanjis_2.json'

//WORDS
import verbs from './json/words/verbs.json'

const App = () => {
  return (
    <div className="App">
      <Router>
        <div>
          <Route path="/" exact component={() => <Home />} />
          <Route
            exact
            path="/hiragana/letters"
            component={() => (
              <LettersGame
                letters={{
                  constant_letters: hiragana_constant_letters,
                  h_letters: hiragana_h_letters,
                  k_letters: hiragana_k_letters,
                  m_letters: hiragana_m_letters,
                  n_letters: hiragana_n_letters,
                  r_letters: hiragana_r_letters,
                  s_letters: hiragana_s_letters,
                  t_letters: hiragana_t_letters,
                  w_letters: hiragana_w_letters,
                  y_letters: hiragana_y_letters,
                  g_letters: hiragana_g_letters,
                  z_letters: hiragana_z_letters,
                  d_letters: hiragana_d_letters,
                  b_letters: hiragana_b_letters,
                  p_letters: hiragana_p_letters
                }}
              />
            )}
          />
          <Route
            exact
            path="/katakana/letters"
            component={() => (
              <LettersGame
                letters={{
                  constant_letters: katakana_constant_letters,
                  h_letters: katakana_h_letters,
                  k_letters: katakana_k_letters,
                  m_letters: katakana_m_letters,
                  n_letters: katakana_n_letters,
                  r_letters: katakana_r_letters,
                  s_letters: katakana_s_letters,
                  t_letters: katakana_t_letters,
                  w_letters: katakana_w_letters,
                  y_letters: katakana_y_letters,
                  g_letters: katakana_g_letters,
                  z_letters: katakana_z_letters,
                  d_letters: katakana_d_letters,
                  b_letters: katakana_b_letters,
                  p_letters: katakana_p_letters
                }}
              />
            )}
          />
          <Route
            exact
            path="/kanji"
            component={() => (
              <LettersGame
                kanji
                letters={{
                  own_kanjis,
                  own_kanjis_2,
                  kanjis_1_20,
                  kanjis_21_40,
                  kanjis_41_60,
                  kanjis_61_80,
                  kanjis_81_100,
                  kanjis_81_100
                }}
              />
            )}
          />
          <Route
            exact
            path="/words"
            component={() => <LettersGame words letters={{ verbs }} />}
          />
        </div>
      </Router>
    </div>
  )
}

export default App
