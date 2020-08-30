import React from 'react';
import './Home.min.css';
import { Link } from 'react-router-dom';

const Home = () => {
	return (
		<div className="Home">
			<h1>Hiragana Game</h1>
			<div className="link">
				<Link to="/hiragana/letters">Play with letters</Link>
			</div>
			<div className="link">
				<Link to="/hiragana/words">Play with words (soon)</Link>
			</div>
			<h1>Katakana Game</h1>
			<div className="link">
				<Link to="/letters">Play with letters</Link>
			</div>
			<div className="link">
				<Link to="/words">Play with words (soon)</Link>
			</div>
		</div>
	);
};

export default Home;
