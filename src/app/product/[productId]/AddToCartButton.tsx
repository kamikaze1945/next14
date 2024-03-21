"use client";

import clsx from "clsx";
import { useFormStatus } from "react-dom";

export const AddToCartButton = () => {
	const { pending } = useFormStatus();

	console.log(pending);
	return (
		<button
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
			{pending ? "Waiting..." : "Add to cart"}
		</button>
	);
};
