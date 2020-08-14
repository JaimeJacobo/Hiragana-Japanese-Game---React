import React from 'react';
import './Home.min.css';
import { Link } from 'react-router-dom';
import Div100vh from 'react-div-100vh';

const Home = () => {
	return (
		<Div100vh>
			<div className="Home">
				<h1>Hiragana Game</h1>
				<div className="link">
					<Link to="/letters">Play letters game</Link>
				</div>
				<div className="link">
					<Link to="/words">Play words game (soon)</Link>
				</div>
			</div>
		</Div100vh>
	);
};

export default Home;
