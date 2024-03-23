"use client";

import { useOptimistic, useState } from "react";
import { changeProductQuantity } from "@/app/cart/action";

export const ButtonsChangeProductQuantity = ({
	cartId,
	productId,
	quantity,
}: {
	cartId: string;
	productId: string;
	quantity: number;
}) => {
	const [optimisticQuantity, setOptimisticQuantity] = useOptimistic(
		quantity,
		(_state, newQuantity: number) => newQuantity,
	);

	const [quantityProduct, setQuantityProduct] = useState(
		optimisticQuantity,
	);

	return (
		<form>
			<div className="mx-auto flex w-full items-center justify-center">
				<button
					data-testid="decrement"
					className="group flex items-center justify-center rounded-l-full border border-gray-200 px-4 py-[16px] shadow-sm shadow-transparent transition-all duration-500 hover:border-gray-300 hover:bg-gray-50 hover:shadow-gray-200"
					formAction={async () => {
						setOptimisticQuantity(optimisticQuantity - 1);
						await changeProductQuantity(
							cartId,
							productId,
							optimisticQuantity - 1,
						);
					}}
				>
					<svg
						className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
						xmlns="http://www.w3.org/2000/svg"
						width="22"
						height="22"
						viewBox="0 0 22 22"
						fill="none"
					>
						<path
							d="M16.5 11H5.5"
							stroke=""
							strokeWidth="1.6"
							strokeLinecap="round"
						/>
						<path
							d="M16.5 11H5.5"
							stroke=""
							strokeOpacity="0.2"
							strokeWidth="1.6"
							strokeLinecap="round"
						/>
						<path
							d="M16.5 11H5.5"
							stroke=""
							strokeOpacity="0.2"
							strokeWidth="1.6"
							strokeLinecap="round"
						/>
					</svg>
				</button>
				<input
					type="text"
					className="w-full min-w-[75px] max-w-[118px] border-y border-gray-200 bg-transparent py-[13px] text-center text-lg font-semibold text-gray-900 outline-none placeholder:text-gray-900"
					placeholder={optimisticQuantity.toString()}
					readOnly
				/>
				<button
					data-testid="increment"
					className="group flex items-center justify-center rounded-r-full border border-gray-200 px-4 py-[16px] shadow-sm shadow-transparent transition-all duration-500 hover:border-gray-300 hover:bg-gray-50 hover:shadow-gray-200"
					formAction={async () => {
						setOptimisticQuantity(optimisticQuantity + 1);
						await changeProductQuantity(
							cartId,
							productId,
							optimisticQuantity + 1,
						);
					}}
				>
					<svg
						className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
						xmlns="http://www.w3.org/2000/svg"
						width="22"
						height="22"
						viewBox="0 0 22 22"
						fill="none"
					>
						<path
							d="M11 5.5V16.5M16.5 11H5.5"
							stroke=""
							strokeWidth="1.6"
							strokeLinecap="round"
						/>
						<path
							d="M11 5.5V16.5M16.5 11H5.5"
							stroke=""
							strokeOpacity="0.2"
							strokeWidth="1.6"
							strokeLinecap="round"
						/>
						<path
							d="M11 5.5V16.5M16.5 11H5.5"
							stroke=""
							strokeOpacity="0.2"
							strokeWidth="1.6"
							strokeLinecap="round"
						/>
					</svg>
				</button>
			</div>
		</form>
	);
};
