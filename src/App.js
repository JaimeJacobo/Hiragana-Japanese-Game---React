import React from 'react';
import './App.css';
import Home from './components/Home/Home'
import LettersGame from './components/LettersGame/LettersGame'
import WordsGame from './components/WordsGame/WordsGame'
import { BrowserRouter as Router, Route} from 'react-router-dom';

function App() {
	return (
		<div className="App">
			<Router>
				<div>
					<Route path="/" exact component={Home} />
					<Route path="/letters" component={LettersGame} />
					<Route path="/words" component={WordsGame} />
				</div>
			</Router>
		</div>
	);
}

export default App;
