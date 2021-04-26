import React, { useState, useEffect } from 'react'
import './LettersGame.scss'

const LettersGame = (props) => {
  const [gameVariables, setGameVariables] = useState({})

  const {
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
    p_letters
  } = props.letters

  const {
    own_kanjis,
    own_kanjis_2,
    kanjis_1_20,
    kanjis_21_40,
    kanjis_41_60,
    kanjis_61_80,
    kanjis_81_100
  } = props.letters

  useEffect(() => {
    if (props.kanji) {
      setGameVariables({
        own_kanjis,
        own_kanjis_2,
        kanjis_1_20,
        kanjis_21_40,
        kanjis_41_60,
        kanjis_61_80,
        kanjis_81_100,
        allKanjis: [
          ...own_kanjis,
          ...own_kanjis_2,
          ...kanjis_1_20,
          ...kanjis_21_40,
          ...kanjis_41_60,
          ...kanjis_61_80,
          ...kanjis_81_100
        ]
      })
    } else if (props.words) {
      setGameVariables({
        verbs: props.letters.verbs,
        allWords: [...props.letters.verbs]
      })
    } else {
      setGameVariables({
        constant_letters: constant_letters,
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
        allLetters: [
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
    const listener = (event) => {
      if (event.code === 'Enter' || event.code === 'NumpadEnter') {
        console.log('Enter key was pressed. Run your function.')
        event.preventDefault()
        document.getElementById('inputButton').click()
      }
    }
    document.addEventListener('keydown', listener)
    return () => {
      document.removeEventListener('keydown', listener)
    }
  }, [])

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

  const renderCorrectAnswer = () => {
    return correctAnswerObject.english_meaning[0]
  }

  const getFeedbackMessages = (answer) => {
    if (answer) {
      setFeedbackAnswer('Correcto!')
      updateStreak()
    } else {
      if (props.kanji || props.words) {
        setFeedbackAnswer('ERROR! Correct answer: ' + renderCorrectAnswer())
      } else {
        setFeedbackAnswer('ERROR!')
      }
      updateStreak('reset')
    }
  }

  const checkForAnswer = () => {
    if (props.kanji || props.words) {
      const correctAnswerArray = correctAnswerObject.english_meaning
      correctAnswerArray.includes(valueFromInput)
        ? getFeedbackMessages(true)
        : getFeedbackMessages()
      nextQuestion()
    } else {
      const correctAnswer = correctAnswerObject.latin_letter
      valueFromInput === correctAnswer
        ? getFeedbackMessages(true)
        : getFeedbackMessages()
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
          own_kanjis_2: gameVariables.own_kanjis_2,
          kanjis_1_20: gameVariables.kanjis_1_20,
          kanjis_21_40: gameVariables.kanjis_21_40,
          kanjis_41_60: gameVariables.kanjis_41_60,
          kanjis_61_80: gameVariables.kanjis_61_80,
          kanjis_81_100: gameVariables.kanjis_81_100
        }[name]
      } else if (props.words) {
        selectedGroup = {
          allWords: gameVariables.allWords,
          verbs: gameVariables.verbs
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

  const renderLetterSelectGroupScreen = () => {
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
            onClick={() => updateStates('kanjis_61_80')}
          >
            61-80 Most Used
          </button>
          <button
            className="selectLetterButton"
            onClick={() => updateStates('kanjis_81_100')}
          >
            81-100 Most Used
          </button>
          <button
            className="selectLetterButton"
            onClick={() => updateStates('own_kanjis')}
          >
            My own Kanjis
          </button>
          <button
            className="selectLetterButton"
            onClick={() => updateStates('own_kanjis_2')}
          >
            My own Kanjis 2
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

  const renderWordsSelectGroupScreen = () => {
    return (
      <React.Fragment>
        <h2 className="selectGroupScreen_title">
          Select the group of words you want to play with
        </h2>
        <div className="selectLetter_div">
          <button
            className="selectLetterButton"
            onClick={() => updateStates('verbs')}
          >
            Verbs
          </button>
          <button
            className="selectLetterButton"
            onClick={() => updateStates('allWords')}
          >
            ALL WORDS
          </button>
        </div>
        <div>
          Selected letters:
          {selectedLettersNames.map((group) => (
            <li key={Math.random().toString(36).substr(2, 3)}>{group}</li>
          ))}
        </div>
        <button onClick={() => setGroupOfLetters([...selectedLetters])}>
          Play ENGLISH to JAPANESE
        </button>
        <button onClick={() => setGroupOfLetters([...selectedLetters])}>
          Play JAPANESE to ENGLISH
        </button>
        <button onClick={() => cleanStates()}>CLEAN</button>
      </React.Fragment>
    )
  }

  const selectRenderPage = () => {
    if (groupOfLetters.length === 0) {
      if (props.kanji) {
        return renderKanjiSelectGroupScreen()
      } else if (props.words) {
        return renderWordsSelectGroupScreen()
      } else {
        return renderLetterSelectGroupScreen()
      }
    } else {
      return renderGame()
    }
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
        <button
          id="inputButton"
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

  return <div className="LettersGame">{selectRenderPage()}</div>
}

export default LettersGame
