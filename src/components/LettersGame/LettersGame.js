import React, { useState } from 'react';
import './LettersGame.scss';

const LettersGame = (props) => {

	const hiragana_constant_letters = props.letters.hiragana_constant_letters
	const hiragana_h_letters = props.letters.hiragana_h_letters
	const hiragana_k_letters = props.letters.hiragana_k_letters
	const hiragana_m_letters = props.letters.hiragana_m_letters
	const hiragana_n_letters = props.letters.hiragana_n_letters
	const hiragana_r_letters = props.letters.hiragana_r_letters
	const hiragana_s_letters = props.letters.hiragana_s_letters
	const hiragana_t_letters = props.letters.hiragana_t_letters
	const hiragana_w_letters = props.letters.hiragana_w_letters
	const hiragana_y_letters = props.letters.hiragana_y_letters
	const hiragana_g_letters = props.letters.hiragana_g_letters
	const hiragana_z_letters = props.letters.hiragana_z_letters
	const hiragana_d_letters = props.letters.hiragana_d_letters
	const hiragana_b_letters = props.letters.hiragana_b_letters
	const allLetters = [ ...hiragana_constant_letters, ...hiragana_h_letters, ...hiragana_k_letters, ...hiragana_m_letters, ...hiragana_n_letters, ...hiragana_r_letters, ...hiragana_s_letters, ...hiragana_t_letters, ...hiragana_w_letters, ...hiragana_y_letters, ...hiragana_g_letters, ...hiragana_z_letters, ...hiragana_d_letters, ...hiragana_b_letters];

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
				<div className="selectLetter_div">
					<button className="selectLetterButton" onClick={() => setGroupOfLetters(allLetters)}>
						All letters
					</button>
					<button className="selectLetterButton" onClick={() => setGroupOfLetters(hiragana_k_letters)}>
						K-letters
					</button>
					<button className="selectLetterButton" onClick={() => setGroupOfLetters(hiragana_s_letters)}>
						S-letters
					</button>
					<button className="selectLetterButton" onClick={() => setGroupOfLetters(hiragana_t_letters)}>
						T-letters
					</button>
					<button className="selectLetterButton" onClick={() => setGroupOfLetters(hiragana_n_letters)}>
						N-letters
					</button>
					<button className="selectLetterButton" onClick={() => setGroupOfLetters(hiragana_h_letters)}>
						H-letters
					</button>
					<button className="selectLetterButton" onClick={() => setGroupOfLetters(hiragana_m_letters)}>
						M-letters
					</button>
					<button className="selectLetterButton" onClick={() => setGroupOfLetters(hiragana_y_letters)}>
						Y-letters
					</button>
					<button className="selectLetterButton" onClick={() => setGroupOfLetters(hiragana_r_letters)}>
						R-letters
					</button>
					<button className="selectLetterButton" onClick={() => setGroupOfLetters(hiragana_w_letters)}>
						W-letters
					</button>
					<button className="selectLetterButton" onClick={() => setGroupOfLetters(hiragana_g_letters)}>
						G-letters
					</button>
					<button className="selectLetterButton" onClick={() => setGroupOfLetters(hiragana_z_letters)}>
						Z-letters
					</button>
					<button className="selectLetterButton" onClick={() => setGroupOfLetters(hiragana_d_letters)}>
						D-letters
					</button>
					<button className="selectLetterButton" onClick={() => setGroupOfLetters(hiragana_b_letters)}>
						B-letters
					</button>
					<button className="selectLetterButton" onClick={() => setGroupOfLetters(hiragana_constant_letters)}>
						Constant letters
					</button>
				</div>
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
