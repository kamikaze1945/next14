"use client";

import { useState } from "react";

export const ProductCounter = () => {
	const [counter, setCounter] = useState(0);

	return (
		<div
			data-testid="group-layout-static"
			className="mx-auto max-w-md text-center"
		>
			<button onClick={() => setCounter(counter - 1)}>
				Substract
			</button>
			<input
				type="text"
				value={counter}
				readOnly
				className="text-center"
			/>
			<button onClick={() => setCounter(counter + 1)}>
				Add 
			</button>
		</div>
	);
};
