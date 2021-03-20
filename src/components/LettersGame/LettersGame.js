import React, { useState, useEffect } from 'react'
import './LettersGame.scss'

const LettersGame = (props) => {
  const [gameVariables, setGameVariables] = useState({})

  useEffect(() => {
    if (props.kanji) {
      setGameVariables({
        own_kanjis: props.letters.own_kanjis,
        kanjis_1_20: props.letters.kanjis_1_20,
        kanjis_21_40: props.letters.kanjis_21_40,
        kanjis_41_60: props.letters.kanjis_41_60,
        allKanjis: [
          ...props.letters.own_kanjis,
          ...props.letters.kanjis_1_20,
          ...props.letters.kanjis_21_40,
          ...props.letters.kanjis_41_60
        ]
      })
    } else {
      setGameVariables({
        constant_letters: props.letters.constant_letters,
        h_letters: props.letters.h_letters,
        k_letters: props.letters.k_letters,
        m_letters: props.letters.m_letters,
        n_letters: props.letters.n_letters,
        r_letters: props.letters.r_letters,
        s_letters: props.letters.s_letters,
        t_letters: props.letters.t_letters,
        w_letters: props.letters.w_letters,
        y_letters: props.letters.y_letters,
        g_letters: props.letters.g_letters,
        z_letters: props.letters.z_letters,
        d_letters: props.letters.d_letters,
        b_letters: props.letters.b_letters,
        p_letters: props.letters.p_letters,
        allLetters: [
          ...props.letters.constant_letters,
          ...props.letters.h_letters,
          ...props.letters.k_letters,
          ...props.letters.m_letters,
          ...props.letters.n_letters,
          ...props.letters.r_letters,
          ...props.letters.s_letters,
          ...props.letters.t_letters,
          ...props.letters.w_letters,
          ...props.letters.y_letters,
          ...props.letters.g_letters,
          ...props.letters.z_letters,
          ...props.letters.d_letters,
          ...props.letters.b_letters,
          ...props.letters.p_letters
        ]
      })
    }
  }, [])

  let previousAnswer = {}

  const [correctAnswerObject, setCorrectAnswerObject] = useState({
    letter: ':)'
  })
  const [valueFromInput, setValueFromInput] = useState('')
  const [feedbackAnswer, setFeedbackAnswer] = useState('')
  const [groupOfLetters, setGroupOfLetters] = useState([])
  const [selectedLetters, setSelectedLetters] = useState([])
  const [selectedLettersNames, setSelectedLettersNames] = useState([])
  const [streak, setStreak] = useState(0)

  useEffect(() => {
    const inputAnswer = document.getElementById('inputAnswer')
    if (inputAnswer) inputAnswer.focus()
  }, [correctAnswerObject])

  const changePreviousAnswer = () => {
    previousAnswer = correctAnswerObject.letter
  }

  const getRandomIndex = () => {
    return Math.floor(Math.random() * groupOfLetters.length)
  }

  const checkForSamePreviousAnswer = (hiraganaLetter) => {
    if (hiraganaLetter === previousAnswer) {
      return true
    }
    return false
  }

  const getRandomLetter = () => {
    changePreviousAnswer()
    const randomIndex = getRandomIndex()
    if (checkForSamePreviousAnswer(groupOfLetters[randomIndex].letter)) {
      getRandomLetter()
    } else {
      setCorrectAnswerObject(groupOfLetters[randomIndex])
      renderRandomLetter()
    }
  }

  const renderRandomLetter = () => {
    if (correctAnswerObject.letter === ':)') {
      renderFirstQuestion()
    }

    return correctAnswerObject.letter
  }

  const clearInputs = () => {
    setValueFromInput('')
    setFeedbackAnswer('')
  }

  const nextQuestion = () => {
    setTimeout(() => {
      getRandomLetter()
      clearInputs()
    }, 1000)
  }

  const renderFirstQuestion = () => {
    setCorrectAnswerObject(groupOfLetters[getRandomIndex()])
  }

  const updateStreak = (reset) => {
    reset ? setStreak(0) : setStreak(streak + 1)
  }

  const getFeedbackMessage = (answer) => {
    if (answer) {
      setFeedbackAnswer('Correcto!')
      updateStreak()
    } else {
      setFeedbackAnswer('Incorrecto :(')
      updateStreak('reset')
    }
  }

  const checkForAnswer = () => {
    if (props.kanji) {
      const correctAnswerArray = correctAnswerObject.english_meaning
      correctAnswerArray.includes(valueFromInput)
        ? getFeedbackMessage(true)
        : getFeedbackMessage()
      nextQuestion()
    } else {
      const correctAnswer = correctAnswerObject.latin_letter
      valueFromInput === correctAnswer
        ? getFeedbackMessage(true)
        : getFeedbackMessage()
      nextQuestion()
    }
  }

  const renderFeedback = () => feedbackAnswer

  const convertToReadableName = (name) => {
    if (name.includes('_')) {
      let newName = name.split('_')
      newName[0] = newName[0].toUpperCase()
      newName = newName.join(' ')
      return newName
    }
    return name
  }

  const updateStates = (name) => {
    const copyOfSelectedLettersNames = [...selectedLettersNames]

    if (!copyOfSelectedLettersNames.includes(convertToReadableName(name))) {
      //Esta condición sirve para evitar que puedas añadir dos veces el mismo grupo de letras
      setSelectedLettersNames([
        // Esta funcinalidad está para ver los nombres de las letras seleccionadas en pantalla
        ...selectedLettersNames,
        convertToReadableName(name)
      ])

      let selectedGroup = {}

      if (props.kanji) {
        selectedGroup = {
          allKanjis: gameVariables.allKanjis,
          own_kanjis: gameVariables.own_kanjis,
          kanjis_1_20: gameVariables.kanjis_1_20,
          kanjis_21_40: gameVariables.kanjis_21_40,
          kanjis_41_60: gameVariables.kanjis_41_60
        }[name]
      } else {
        selectedGroup = {
          constant_letters: gameVariables.constant_letters,
          h_letters: gameVariables.h_letters,
          k_letters: gameVariables.k_letters,
          m_letters: gameVariables.m_letters,
          n_letters: gameVariables.n_letters,
          r_letters: gameVariables.r_letters,
          s_letters: gameVariables.s_letters,
          t_letters: gameVariables.t_letters,
          w_letters: gameVariables.w_letters,
          y_letters: gameVariables.y_letters,
          g_letters: gameVariables.g_letters,
          z_letters: gameVariables.z_letters,
          d_letters: gameVariables.d_letters,
          b_letters: gameVariables.b_letters,
          p_letters: gameVariables.p_letters,
          allLetters: gameVariables.allLetters
        }[name]
      }

      setSelectedLetters([...selectedGroup, ...selectedLetters])
    }
  }

  const cleanStates = () => {
    setSelectedLetters([])
    setSelectedLettersNames([])
  }

  const renderNonKanjiSelectGroupScreen = () => {
    return (
      <React.Fragment>
        <h2 className="selectGroupScreen_title">
          Select the group of letters you want to play with
        </h2>
        <div className="selectLetter_div">
          <button
            className="selectLetterButton"
            onClick={() => updateStates('allLetters')}
          >
            ALL LETTERS
          </button>
          <button
            className="selectLetterButton"
            onClick={() => updateStates('k_letters')}
          >
            K-letters
          </button>
          <button
            className="selectLetterButton"
            onClick={() => updateStates('s_letters')}
          >
            S-letters
          </button>
          <button
            className="selectLetterButton"
            onClick={() => updateStates('t_letters')}
          >
            T-letters
          </button>
          <button
            className="selectLetterButton"
            onClick={() => updateStates('n_letters')}
          >
            N-letters
          </button>
          <button
            className="selectLetterButton"
            onClick={() => updateStates('h_letters')}
          >
            H-letters
          </button>
          <button
            className="selectLetterButton"
            onClick={() => updateStates('m_letters')}
          >
            M-letters
          </button>
          <button
            className="selectLetterButton"
            onClick={() => updateStates('y_letters')}
          >
            Y-letters
          </button>
          <button
            className="selectLetterButton"
            onClick={() => updateStates('r_letters')}
          >
            R-letters
          </button>
          <button
            className="selectLetterButton"
            onClick={() => updateStates('w_letters')}
          >
            W-letters
          </button>
          <button
            className="selectLetterButton"
            onClick={() => updateStates('g_letters')}
          >
            G-letters
          </button>
          <button
            className="selectLetterButton"
            onClick={() => updateStates('z_letters')}
          >
            Z-letters
          </button>
          <button
            className="selectLetterButton"
            onClick={() => updateStates('d_letters')}
          >
            D-letters
          </button>
          <button
            className="selectLetterButton"
            onClick={() => updateStates('b_letters')}
          >
            B-letters
          </button>
          <button
            className="selectLetterButton"
            onClick={() => updateStates('p_letters')}
          >
            P-letters
          </button>
          <button
            className="selectLetterButton"
            onClick={() => updateStates('constant_letters')}
          >
            Constant letters
          </button>
        </div>
        <div>
          Selected letters:
          {selectedLettersNames.map((group) => (
            <li key={Math.random().toString(36).substr(2, 3)}>{group}</li>
          ))}
        </div>
        <button onClick={() => setGroupOfLetters([...selectedLetters])}>
          PLAY!
        </button>
        <button onClick={() => cleanStates()}>CLEAN</button>
      </React.Fragment>
    )
  }

  const renderKanjiSelectGroupScreen = () => {
    return (
      <React.Fragment>
        <h2 className="selectGroupScreen_title">
          Select the group of letters you want to play with
        </h2>
        <div className="selectLetter_div">
          <button
            className="selectLetterButton"
            onClick={() => updateStates('allKanjis')}
          >
            ALL KANJIS
          </button>
          <button
            className="selectLetterButton"
            onClick={() => updateStates('kanjis_1_20')}
          >
            1-20 Most Used
          </button>
          <button
            className="selectLetterButton"
            onClick={() => updateStates('kanjis_21_40')}
          >
            21-40 Most Used
          </button>
          <button
            className="selectLetterButton"
            onClick={() => updateStates('kanjis_41_60')}
          >
            41-60 Most Used
          </button>
          <button
            className="selectLetterButton"
            onClick={() => updateStates('own_kanjis')}
          >
            My own Kanjis
          </button>
        </div>
        <div>
          Selected letters:
          {selectedLettersNames.map((group) => (
            <li key={Math.random().toString(36).substr(2, 3)}>{group}</li>
          ))}
        </div>
        <button onClick={() => setGroupOfLetters([...selectedLetters])}>
          Play ENGLISH
        </button>
        <button onClick={() => console.log('')}>Play KUNYOMI (SOON)</button>
        <button onClick={() => console.log('')}>Play ONYOMI (SOON)</button>
        <button onClick={() => cleanStates()}>CLEAN</button>
      </React.Fragment>
    )
  }

  const renderGame = () => {
    return (
      <React.Fragment>
        <div>
          <p className="streak">Streak: {streak}</p>
        </div>
        <div className="letter">{renderRandomLetter()}</div>
        <input
          autoFocus
          id="inputAnswer"
          type="text"
          value={valueFromInput}
          onChange={(event) =>
            setValueFromInput(event.target.value.toLowerCase())
          }
        />
        <button className="inputButton" onClick={() => checkForAnswer()}>
          Check answer
        </button>
        <div className="feedback_container">
          <p>{renderFeedback()}</p>
        </div>
      </React.Fragment>
    )
  }

  return (
    <div className="LettersGame">
      {groupOfLetters.length === 0
        ? props.kanji
          ? renderKanjiSelectGroupScreen()
          : renderNonKanjiSelectGroupScreen()
        : renderGame()}
    </div>
  )
}

export default LettersGame
