import React from 'react';
import './Home.min.css';
import { BrowserRouter as Link } from 'react-router-dom';

const Home = () => {
	return (
		<div className="Home">
			<h1>Hiragana Game</h1>
			<div className="link">
				<Link to="/letters">Play letters game</Link>
			</div>
			<div className="link">
				<Link to="/words">Play words game (soon)</Link>
			</div>
		</div>
	);
};

export default Home;
