import React from 'react';

interface ButtonProps {
	symbol: string;
	click: Function;
}

export function Button({ symbol, click }: ButtonProps) {
	const style = {
		padding: '0.5rem',
		backgroundColor: `${
			isNaN(parseInt(symbol))
				? 'rgba(81, 87, 83, 0.25)'
				: 'rgba(222, 224, 223, 0.25)'
		}`,
		backgroundOpacity: '25%',
		border: 'none',
		borderRadius: '1.5rem',
		fontSize: '20px'
	};

	return (
		<button onClick={() => click(symbol)} style={style}>
			{symbol}
		</button>
	);
}
