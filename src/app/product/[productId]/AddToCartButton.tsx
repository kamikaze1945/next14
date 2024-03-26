"use client";

import clsx from "clsx";
import { useFormStatus } from "react-dom";

export const AddToCartButton = () => {
	const { pending } = useFormStatus();

	return (
		<button
			data-testid="add-to-cart-button"
			type="submit"
			aria-disabled={pending}
			disabled={pending}
			className={clsx(
				"m-3 me-5 w-full transform rounded-lg bg-gradient-to-br from-green-400 to-blue-600 px-5 py-4 text-center text-sm font-medium text-white transition-transform hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-green-200  active:scale-95 disabled:cursor-wait  dark:focus:ring-green-800",
				{
					["disabled:bg-slate-50"]: pending,
				},
			)}
		>
			{pending ? (
				<div className="flex justify-center">
					<svg
						className="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
					>
						<circle
							className="opacity-25"
							cx="12"
							cy="12"
							r="10"
							stroke="currentColor"
							strokeWidth="4"
						></circle>
						<path
							className="opacity-75"
							fill="currentColor"
							d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
						></path>
					</svg>
				</div>
			) : (
				<div>Add to cart</div>
			)}
		</button>
	);
};
