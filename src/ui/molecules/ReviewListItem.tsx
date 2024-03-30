import NextImage from "next/image";
import { type ReviewFragment } from "@/gql/graphql";
import { ProductRating } from "@/ui/molecules/ProductRating";

export const ReviewsListItem = ({
	review,
}: {
	review: ReviewFragment;
}) => {
	return (
		<article className="my-4 rounded-sm border-b-2 bg-slate-50 p-4 ">
			<div className="mb-2 flex items-center justify-between border-b-2 border-gray-100">
				<div className="flex items-center gap-1">
					<h3 className="text-sm">{review.author}</h3>
				</div>
				<ProductRating rating={review.rating} />
			</div>
			<h3 className="mb-1 text-sm font-bold">{review.title}</h3>
			<p className="text-slate-800">{review.description}</p>
		</article>
	);
};
