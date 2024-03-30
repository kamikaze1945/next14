"use client";

import { useOptimistic } from "react";
import { type ReviewFragment } from "@/gql/graphql";
import { ProductRating } from "@/ui/molecules/ProductRating";
import { ReviewsListItem } from "@/ui/molecules/ReviewListItem";
import { ReviewsForm } from "@/ui/molecules/ReviewForm";

export const ReviewsList = ({
	productId,
	reviews,
}: {
	productId: string;
	reviews?: ReviewFragment[];
}) => {
	if (!reviews) {
		throw new Error("No reviews found");
	}

	const [optimisticReviews, setOptimisticReviews] = useOptimistic(
		reviews,
		(state, newReview: ReviewFragment) => [...state, newReview],
	);

	const addNewReviewHandler = (newReview: ReviewFragment) => {
		setOptimisticReviews(newReview);
	};

	return (
		<div className="lg:grid lg:grid-cols-3 lg:gap-4">
			<article>
				<h3 className="text-md mt-4 font-semibold">Add review</h3>
				<div className="mb-4 flex gap-2 font-semibold text-gray-600"></div>
				<ReviewsForm
					productId={productId}
					addNewOptimisticReview={addNewReviewHandler}
				/>
			</article>
			<div className="col-span-2 mt-12 lg:mt-0">
				<h3 className="text-md mt-4 font-semibold">Review list</h3>

				{optimisticReviews.length > 0 ? (
					optimisticReviews.map((review) => (
						<ReviewsListItem key={review.id} review={review} />
					))
				) : (
					<p>You can add first review. Let's do it!</p>
				)}
			</div>
		</div>
	);
};
