"use client";

import { contactAction } from "@/app/[locale]/contact/contactAction";
import { contactSchema } from "@/app/[locale]/contact/contactSchema";
import { useTypesafeFormState } from "@/types/typesafeForm";
import clsx from "clsx";
import { useRef } from "react";
import { useFormStatus } from "react-dom";

export const ContactForm = () => {
	const formRefContact = useRef<HTMLFormElement | null>(null);

	const [state, action] = useTypesafeFormState(
		contactSchema,
		async (data) => {
			const result = await contactAction(data);
			formRefContact.current?.reset();
		},
	);

	return (
		<div>
			<form
				action={action}
				ref={formRefContact}
				className="mt-2 flex flex-col gap-y-2"
			>
				<label htmlFor="name">
					<input
						type="text"
						name="name"
						id="name"
						placeholder="Name"
						className="mt-1 block w-full rounded-md border-2 border-gray-100 bg-gray-50 p-2 outline-none transition-colors duration-300 hover:border-blue-300 focus:border-blue-300 active:border-blue-300"
					/>
					{state?.errors?.name &&
						state?.errors?.name.map((error) => (
							<p key={error} className="text-red-500">
								{error}
							</p>
						))}
				</label>
				<label htmlFor="email">
					<input
						type="email"
						name="email"
						id="email"
						placeholder="E-mail"
						className="mt-1 block w-full rounded-md border-2 border-gray-100 bg-gray-50 p-2 outline-none transition-colors duration-300 hover:border-blue-300 focus:border-blue-300 active:border-blue-300"
					/>
					{state?.errors?.email &&
						state?.errors?.email.map((error) => (
							<p key={error} className="text-red-500">
								{error}
							</p>
						))}
				</label>
				<label htmlFor="message">
					<textarea
						name="message"
						id="message"
						placeholder="Message"
						rows={6}
						className="mt-1 block w-full rounded-md border-2 border-gray-100 bg-gray-50 p-2 outline-none transition-colors duration-300 hover:border-blue-300 focus:border-blue-300 active:border-blue-300"
					/>
					{state?.errors?.message &&
						state?.errors?.message.map((error) => (
							<p key={error} className="text-red-500">
								{error}
							</p>
						))}
				</label>
				<SubmitButton />
			</form>
		</div>
	);
};

const SubmitButton = () => {
	const { pending } = useFormStatus();
	return (
		<button
			type="submit"
			className={clsx(
				"mt-4 w-full rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 disabled:cursor-wait",
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
				<div>Submit</div>
			)}
		</button>
	);
};
