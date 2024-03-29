import { useRef } from "react";
import { type ReviewFragment } from "@/gql/graphql";
import { createReview } from "@/api/products";
import { ReviewType } from "@/types/products";

export const ReviewsForm = ({
	productId,
	addNewOptimisticReview,
}: {
	productId: string;
	addNewOptimisticReview: (newReview: ReviewFragment) => void;
}) => {
	const formRef = useRef<HTMLFormElement>(null);

	return (
		<form
			data-testid="add-review-form"
			className="mx-auto flex w-full flex-col gap-4 "
			ref={formRef}
		>
			<input
				type="text"
				name="headline"
				id="headline"
				placeholder="Title"
				className="block border-2 border-gray-600 bg-gray-50 p-2 outline-none transition-colors duration-300 hover:border-blue-500 focus:border-blue-500 active:border-blue-500"
			/>
			<textarea
				name="content"
				id="content"
				placeholder="Description"
				rows={6}
				className="block border-2 border-gray-600 bg-gray-50 p-2 outline-none transition-colors duration-300 hover:border-blue-500 focus:border-blue-500 active:border-blue-500"
			/>
			<select
				name="rating"
				id="rating"
				className="block border-2 border-gray-600 bg-gray-50 p-2 outline-none transition-colors duration-300 hover:border-blue-500 focus:border-blue-500 active:border-blue-500"
				defaultValue="Rating"
			>
				<option value="Rating" disabled>
					Rating
				</option>
				<option value="1">1</option>
				<option value="2">2</option>
				<option value="3">3</option>
				<option value="4">4</option>
				<option value="5">5</option>
			</select>
			<input
				type="text"
				name="name"
				id="name"
				placeholder="Author"
				className="block border-2 border-gray-600 bg-gray-50 p-2 outline-none transition-colors duration-300 hover:border-blue-500 focus:border-blue-500 active:border-blue-500"
			/>
			<input
				type="email"
				name="email"
				id="email"
				placeholder="E-mail"
				className="block border-2 border-gray-600 bg-gray-50 p-2 outline-none transition-colors duration-300 hover:border-blue-500 focus:border-blue-500 active:border-blue-500"
			/>
			<button
				type="submit"
				className="rounded-md bg-slate-700 p-2 text-white transition-colors duration-300 hover:bg-slate-900 active:bg-slate-900"
				formAction={async (formData) => {
					const { name, content, email, rating, headline } =
						Object.fromEntries(formData) as unknown as ReviewType;

					addNewOptimisticReview({
						author: name,
						title: headline,
						description: content,
						email: email,
						id: productId,
						rating: Number(rating),
					});
					await createReview(productId, formData);
					formRef.current?.reset();
				}}
			>
				Add review
			</button>
		</form>
	);
};
