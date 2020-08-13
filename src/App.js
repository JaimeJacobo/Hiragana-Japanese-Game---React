import React, { useEffect, useState } from 'react';
import './App.css';
import Home from './components/Home/Home';
import LettersGame from './components/LettersGame/LettersGame';
import WordsGame from './components/WordsGame/WordsGame';
import lettersJSON from './json/letters.json';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const App = () => {
	const [ letters, setLetters ] = useState(lettersJSON);

	return (
		<div className="App">
			<Router>
				<div>
					<Route path="/" exact component={() => <Home />} />
					<Route path="/letters" component={() => <LettersGame letters={letters}/>} />
					<Route path="/words" component={() => <WordsGame />} />
				</div>
			</Router>
		</div>
	);
};

export default App;
