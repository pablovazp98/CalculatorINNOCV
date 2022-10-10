import React from 'react';

import './App.css';

import { Calculator } from './components/Calculator/Calculator';

function App() {
	return (
		<header className='app-header'>
			<h1>Calculator ReactJS</h1>
			<hr />
			<Calculator />
		</header>
	);
}

export default App;
