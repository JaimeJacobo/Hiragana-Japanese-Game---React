import React, { useState, useEffect } from 'react';
import './LettersGame.min.css';

const LettersGame = (props) => {
	let letters = props.letters;
	const [ correctAnswerObject, setCorrectAnswerObject ] = useState({ hiragana_letter: ':)' });
	// const [ previousAnswer, setPreviousAnswer ] = useState({ hiragana_letter: 'hola' });
	let previousAnswer = { hiragana_letter: 'hola' };

	const [ valueFromInput, setValueFromInput ] = useState('');
	const [ feedbackAnswer, setFeedbackAnswer ] = useState('');

	useEffect(() => {
		getRandomLetter();
	}, []);

	const changePreviousAnswer = () => {
		previousAnswer = correctAnswerObject.hiragana_letter;
	};

	const getRandomIndex = () => {
		return Math.floor(Math.random() * letters.length);
	};

	const checkForPreviousAnswer = (hiraganaLetter) => {
		if (hiraganaLetter === previousAnswer) {
			return false;
		}
		return true;
	};

	const getRandomLetter = () => {
		changePreviousAnswer();
		const randomIndex = getRandomIndex();
		console.log(checkForPreviousAnswer(letters[randomIndex].hiragana_letter))
		if (checkForPreviousAnswer(letters[randomIndex].hiragana_letter)) {
			setCorrectAnswerObject(letters[randomIndex]);
			renderRandomLetter();
		} else {
			getRandomLetter();
		}
	};

	const renderRandomLetter = () => {
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

	const getFeedbackMessage = (answer) => {
		answer ? setFeedbackAnswer('Correcto!') : setFeedbackAnswer('Incorrecto :(');
		nextQuestion();
	};

	const checkForAnswer = () => {
		const inputAnswer = valueFromInput;
		const correctAnswer = correctAnswerObject.latin_letter;
		inputAnswer === correctAnswer ? getFeedbackMessage(true) : getFeedbackMessage();
	};

	const renderFeedback = () => {
		return feedbackAnswer;
	};

	return (
		<div className="LettersGame">
			<div className="letter">{renderRandomLetter()}</div>
			<input type="text" value={valueFromInput} onChange={(event) => setValueFromInput(event.target.value)} />
			<button className="inputButton" onClick={() => checkForAnswer()}>
				Check answer
			</button>
			<div className="feedback_container">
				<p>{renderFeedback()}</p>
			</div>
		</div>
	);
};

export default LettersGame;
