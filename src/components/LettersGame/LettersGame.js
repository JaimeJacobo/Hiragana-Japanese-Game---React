import React, { useState } from 'react';
import './LettersGame.min.css';

const LettersGame = (props) => {
	const lettersDayOne = props.letters.lettersDayOne;
	const lettersDayTwo = props.letters.lettersDayTwo;
	const lettersDayThree = props.letters.lettersDayThree;
	const allLetters = [ ...lettersDayOne, ...lettersDayTwo, ...lettersDayThree ];

	let previousAnswer = {};
	const [ correctAnswerObject, setCorrectAnswerObject ] = useState({ hiragana_letter: ':)' });

	const [ valueFromInput, setValueFromInput ] = useState('');
	const [ feedbackAnswer, setFeedbackAnswer ] = useState('');
	const [ groupOfLetters, setGroupOfLetters ] = useState([]);
	const [ streak, setStreak ] = useState(0);

	const changePreviousAnswer = () => {
		previousAnswer = correctAnswerObject.hiragana_letter;
	};

	const getRandomIndex = () => {
		return Math.floor(Math.random() * groupOfLetters.length);
	};

	const checkForSamePreviousAnswer = (hiraganaLetter) => {
		if (hiraganaLetter === previousAnswer) {
			return true;
		}
		return false;
	};

	const getRandomLetter = () => {
		changePreviousAnswer();
		const randomIndex = getRandomIndex();
		if (checkForSamePreviousAnswer(groupOfLetters[randomIndex].hiragana_letter)) {
			getRandomLetter();
		} else {
			setCorrectAnswerObject(groupOfLetters[randomIndex]);
			renderRandomLetter();
		}
	};

	const renderRandomLetter = () => {
		if (correctAnswerObject.hiragana_letter === ':)') {
			renderFirstQuestion();
		}

		return correctAnswerObject.hiragana_letter;
	};

	const clearInputs = () => {
		setValueFromInput('');
		setFeedbackAnswer('');
	};

	const nextQuestion = () => {
		setTimeout(() => {
			getRandomLetter();
			clearInputs();
		}, 1000);
	};

	const renderFirstQuestion = () => {
		setCorrectAnswerObject(groupOfLetters[getRandomIndex()]);
	};

	const updateStreak = (reset) => {
		reset ? setStreak(0) : setStreak(streak + 1);
	};

	const getFeedbackMessage = (answer) => {
		if (answer) {
			setFeedbackAnswer('Correcto!');
			updateStreak();
		} else {
			setFeedbackAnswer('Incorrecto :(');
			updateStreak('reset');
		}
	};

	const checkForAnswer = () => {
		const inputAnswer = valueFromInput;
		const correctAnswer = correctAnswerObject.latin_letter;
		inputAnswer === correctAnswer ? getFeedbackMessage(true) : getFeedbackMessage();
		nextQuestion();
	};

	const renderFeedback = () => {
		return feedbackAnswer;
	};

	const renderSelectGroupScreen = () => {
		return (
			<React.Fragment>
				<h2 className="selectGroupScreen_title">Select the group of letters you want to play with</h2>
				<button className="selectLetterButton" onClick={() => setGroupOfLetters(allLetters)}>
					All letters
				</button>
				<button className="selectLetterButton" onClick={() => setGroupOfLetters(lettersDayOne)}>
					Day 1
				</button>
				<button className="selectLetterButton" onClick={() => setGroupOfLetters(lettersDayTwo)}>
					Day 2
				</button>
				<button className="selectLetterButton" onClick={() => setGroupOfLetters(lettersDayThree)}>
					Day 3
				</button>
			</React.Fragment>
		);
	};

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
					onChange={(event) => setValueFromInput(event.target.value.toLowerCase())}
				/>
				<button className="inputButton" onClick={() => checkForAnswer()}>
					Check answer
				</button>
				<div className="feedback_container">
					<p>{renderFeedback()}</p>
				</div>
			</React.Fragment>
		);
	};

	return <div className="LettersGame">{groupOfLetters.length === 0 ? renderSelectGroupScreen() : renderGame()}</div>;
};

export default LettersGame;
