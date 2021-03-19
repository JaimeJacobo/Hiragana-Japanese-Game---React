import React, { useState } from 'react'
import './KanjisGame.scss'

const LettersGame = (props) => {
  const { kanjis_1_20, own_kanjis, kanjis_21_40 } = props.letters

  const allKanjis = [...kanjis_1_20, ...own_kanjis, ...kanjis_21_40]

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
    const correctAnswerArray = correctAnswerObject.english_meaning
    correctAnswerArray.includes(inputAnswer)
      ? getFeedbackMessage(true)
      : getFeedbackMessage()
    nextQuestion()
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

    //Esta condición sirve para evitar que puedas añadir dos veces el mismo grupo de letras
    if (!copyOfSelectedLettersNames.includes(convertToReadableName(name))) {
      // Esta funcinalidad está para ver los nombres de las letras seleccionadas en pantalla
      setSelectedLettersNames([
        ...selectedLettersNames,
        convertToReadableName(name)
      ])

      //Selecciona el grupo correspondiente a partir del nombre
      const selectedGroup = {
        kanjis_1_20,
        allKanjis,
        own_kanjis,
        kanjis_21_40
      }[name]

      setSelectedLetters([...selectedGroup, ...selectedLetters])
    }
  }

  const cleanStates = () => {
    setSelectedLetters([])
    setSelectedLettersNames([])
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
          type="text"
          value={valueFromInput}
          onChange={(event) =>
            setValueFromInput(event.target.value.toLowerCase())
          }
        />
        <button
          id="submitAnswer"
          className="inputButton"
          onClick={() => checkForAnswer()}
        >
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
