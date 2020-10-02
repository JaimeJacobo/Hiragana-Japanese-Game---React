import React, { useState } from 'react'
import './LettersGame.scss'

const LettersGame = (props) => {
  const constant_letters = props.letters.constant_letters
  const h_letters = props.letters.h_letters
  const k_letters = props.letters.k_letters
  const m_letters = props.letters.m_letters
  const n_letters = props.letters.n_letters
  const r_letters = props.letters.r_letters
  const s_letters = props.letters.s_letters
  const t_letters = props.letters.t_letters
  const w_letters = props.letters.w_letters
  const y_letters = props.letters.y_letters
  const g_letters = props.letters.g_letters
  const z_letters = props.letters.z_letters
  const d_letters = props.letters.d_letters
  const b_letters = props.letters.b_letters
  const p_letters = props.letters.p_letters
  const allLetters = [
    ...constant_letters,
    ...h_letters,
    ...k_letters,
    ...m_letters,
    ...n_letters,
    ...r_letters,
    ...s_letters,
    ...t_letters,
    ...w_letters,
    ...y_letters,
    ...g_letters,
    ...z_letters,
    ...d_letters,
    ...b_letters,
    ...p_letters
  ]

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
    const inputAnswer = valueFromInput
    const correctAnswer = correctAnswerObject.latin_letter
    inputAnswer === correctAnswer
      ? getFeedbackMessage(true)
      : getFeedbackMessage()
    nextQuestion()
  }

  const renderFeedback = () => {
    return feedbackAnswer
  }

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
      setSelectedLettersNames([
        ...selectedLettersNames,
        convertToReadableName(name)
      ])

      const selectedGroup = {
        constant_letters,
        h_letters,
        k_letters,
        m_letters,
        n_letters,
        r_letters,
        s_letters,
        t_letters,
        w_letters,
        y_letters,
        g_letters,
        z_letters,
        d_letters,
        b_letters,
        p_letters,
        allLetters
      }[name]

      setSelectedLetters([...selectedGroup, ...selectedLetters])
    }
  }

  const renderSelectGroupScreen = () => {
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
          {selectedLettersNames.map((group) => {
            return <li>{group}</li>
          })}
        </div>
        <button onClick={() => setGroupOfLetters([...selectedLetters])}>
          PLAY!
        </button>
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
      {groupOfLetters.length === 0 ? renderSelectGroupScreen() : renderGame()}
    </div>
  )
}

export default LettersGame
