import React from 'react';
import Home from './components/Home/Home';
import LettersGame from './components/LettersGame/LettersGame';
import WordsGame from './components/WordsGame/WordsGame';
import lettersDayOne from './json/letters/lettersDayOne.json';
import lettersDayTwo from './json/letters/lettersDayTwo.json';
import lettersDayThree from './json/letters/lettersDayThree.json';
import lettersDayFour from './json/letters/lettersDayFour.json';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const App = () => {
	return (
		<div className="App">
			<Router>
				<div>
					<Route path="/" exact component={() => <Home />} />
					<Route
						exact
						path="/letters"
						component={() => (
							<LettersGame
								letters={{
									lettersDayOne: lettersDayOne,
									lettersDayTwo: lettersDayTwo,
									lettersDayThree: lettersDayThree,
									lettersDayFour: lettersDayFour
								}}
							/>
						)}
					/>
					<Route exact path="/words" component={() => <WordsGame />} />
				</div>
			</Router>
		</div>
	);
};

export default App;
