import React from 'react';
import './App.css';
import Home from './components/Home/Home';
import LettersGame from './components/LettersGame/LettersGame';
import WordsGame from './components/WordsGame/WordsGame';
import lettersDayOne from './json/lettersDayOne.json';
import lettersDayTwo from './json/lettersDayTwo.json';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Div100vh from 'react-div-100vh';

const App = () => {
	return (
		<Div100vh>
			<div className="App">
				<Router>
					<div>
						<Route path="/" exact component={() => <Home />} />
						<Route
							exact
							path="/letters"
							component={() => (
								<LettersGame letters={{ lettersDayOne: lettersDayOne, lettersDayTwo: lettersDayTwo }} />
							)}
						/>
						<Route exact path="/words" component={() => <WordsGame />} />
					</div>
				</Router>
			</div>
		</Div100vh>
	);
};

export default App;
