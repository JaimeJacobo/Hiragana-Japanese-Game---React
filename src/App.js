import React from 'react';
import Home from './components/Home/Home';
import LettersGame from './components/LettersGame/LettersGame';
import hiragana_constant_letters from './json/hiragana/letters/constants.json';
import hiragana_h_letters from './json/hiragana/letters/h-letters.json';
import hiragana_k_letters from './json/hiragana/letters/k-letters.json';
import hiragana_m_letters from './json/hiragana/letters/m-letters.json';
import hiragana_n_letters from './json/hiragana/letters/n-letters.json';
import hiragana_r_letters from './json/hiragana/letters/r-letters.json';
import hiragana_s_letters from './json/hiragana/letters/s-letters.json';
import hiragana_t_letters from './json/hiragana/letters/t-letters.json';
import hiragana_w_letters from './json/hiragana/letters/w-letters.json';
import hiragana_y_letters from './json/hiragana/letters/y-letters.json';
import hiragana_g_letters from './json/hiragana/letters/g-letters.json';
import hiragana_z_letters from './json/hiragana/letters/z-letters.json';
import hiragana_d_letters from './json/hiragana/letters/d-letters.json';
import hiragana_b_letters from './json/hiragana/letters/b-letters.json';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const App = () => {
	return (
		<div className="App">
			<Router>
				<div>
					<Route path="/" exact component={() => <Home />} />
					<Route
						exact
						path="/hiragana/letters"
						component={() => (
							<LettersGame
								letters={{
									hiragana_constant_letters: hiragana_constant_letters,
									hiragana_h_letters: hiragana_h_letters,
									hiragana_k_letters: hiragana_k_letters,
									hiragana_m_letters: hiragana_m_letters,
									hiragana_n_letters: hiragana_n_letters,
									hiragana_r_letters: hiragana_r_letters,
									hiragana_s_letters: hiragana_s_letters,
									hiragana_t_letters: hiragana_t_letters,
									hiragana_w_letters: hiragana_w_letters,
									hiragana_y_letters: hiragana_y_letters,
									hiragana_g_letters: hiragana_g_letters,
									hiragana_z_letters: hiragana_z_letters,
									hiragana_d_letters: hiragana_d_letters,
									hiragana_b_letters: hiragana_b_letters
								}}
							/>
						)}
					/>
					{/* <Route exact path="/hiragana/letters" component={() => <lettersGame />} /> */}
				</div>
			</Router>
		</div>
	);
};

export default App;
