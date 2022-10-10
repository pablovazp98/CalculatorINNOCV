import React, { useState } from 'react';

import { Button } from '../Button';

import './Calculator.css';

const operators = ['+', '-', '*', '/'];
const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'];
const specials = ['C', '=', '+/-', 'DEL'];

export function Calculator() {
	const [result, setResult] = useState(0);
	const [operation, setOperation] = useState('');

	const manageResult = () => {
		let result =
			Math.round((eval(operation) + Number.EPSILON) * 1e10) / 1e10;
		console.log(typeof result, result.toFixed());
		setResult(result);
	};

	const manageOperation = (newOperation: string) => {
		if (newOperation === 'C') {
			setResult(0);
			setOperation('');
		} else if (newOperation === '=') {
			manageResult();
		} else if (newOperation === '+/-') {
			setOperation((prevState) => {
				for (let i = prevState.length; i >= 0; i--) {
					if (operators.includes(prevState[i])) {
						return prevState[i] === '-'
							? prevState.slice(0, i + 1) +
									'(-' +
									prevState.slice(i + 1) +
									')'
							: prevState.slice(0, i + 1) +
									'-' +
									prevState.slice(i + 1);
					}
				}
				return '-' + prevState;
			});
		} else if (newOperation === 'DEL') {
			setOperation((prevState) =>
				prevState.slice(0, prevState.length - 1)
			);
		} else {
			setOperation((prevState) => {
				let index = prevState.length && prevState.length - 1;

				if (operators.includes(newOperation)) {
					if (!prevState) return prevState;
					else if (operators.includes(prevState[index]))
						return (
							prevState.slice(0, prevState.length - 1) +
							newOperation
						);
				} else {
					if (
						(index === 0 && prevState[index] === '0') ||
						(operators.includes(prevState[index - 1]) &&
							prevState[index] === '0')
					) {
						return (
							prevState.slice(0, prevState.length - 1) +
							newOperation
						);
					}
				}

				return prevState + newOperation;
			});
		}
	};

	return (
		<div className='container'>
			<Display result={result} operation={operation}></Display>
			<ButtonPanel setOperation={manageOperation}></ButtonPanel>
		</div>
	);
}

interface DisplayProps {
	result: number;
	operation: string;
}

const Display = ({ result, operation }: DisplayProps) => (
	<div className='display'>
		<p className='operation'>{operation}</p>
		<p className='result'>{result}</p>
	</div>
);

interface ButtonPanelProps {
	setOperation: Function;
}

const ButtonPanel = ({ setOperation }: ButtonPanelProps) => (
	<div className='buttons'>
		{operators.map((operator, index) => (
			<Button symbol={operator} click={setOperation} key={index} />
		))}
		{numbers.map((number, index) => (
			<Button symbol={number} click={setOperation} key={index} />
		))}
		{specials.map((elem, index) => (
			<Button symbol={elem} click={setOperation} key={index} />
		))}
	</div>
);
