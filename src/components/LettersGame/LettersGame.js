import React, { useState } from 'react';
import './LettersGame.min.css';

const LettersGame = (props) => {
	let lettersDayOne = props.letters.lettersDayOne;
	let lettersDayTwo = props.letters.lettersDayTwo;

	let previousAnswer = {};
	const [ correctAnswerObject, setCorrectAnswerObject ] = useState({ hiragana_letter: ':)' });

	const [ valueFromInput, setValueFromInput ] = useState('');
	const [ feedbackAnswer, setFeedbackAnswer ] = useState('');
	const [ groupOfLetters, setGroupOfLetters ] = useState([]);

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
			return correctAnswerObject.hiragana_letter;
		} else {
			return correctAnswerObject.hiragana_letter;
		}
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

	const getFeedbackMessage = (answer) => {
		answer ? setFeedbackAnswer('Correcto!') : setFeedbackAnswer('Incorrecto :(');
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

	return (
		<div className="LettersGame">
			{groupOfLetters.length === 0 ? (
				<React.Fragment>
					<h2>Select the group of letters you want to play with</h2>
					<button onClick={() => setGroupOfLetters(lettersDayOne)}>Day 1</button>
					<button onClick={() => setGroupOfLetters(lettersDayTwo)}>Day 2</button>
				</React.Fragment>
			) : (
				<React.Fragment>
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
			)}
		</div>
	);
};

export default LettersGame;
