import NextImage from "next/image";
import { type ReviewFragment } from "@/gql/graphql";
import { ProductRating } from "@/ui/molecules/ProductRating";

export const ReviewsListItem = ({
	review,
}: {
	review: ReviewFragment;
}) => {
	return (
		<article className="my-4 rounded-md bg-slate-50 p-4 shadow-md">
			<div className="mb-2 flex items-center justify-between">
				<div className="flex items-center gap-1">
					{/* <NextImage
						src="/avatar.png"
						width={50}
						height={50}
						alt="avatar"
						className="rounded-full mix-blend-multiply"
					/> */}
					<h2 className="text-lg font-semibold">{review.author}</h2>
				</div>
				<ProductRating rating={review.rating} />
				{/* <p className=" text-sm font-semibold italic">{review.rating}/5</p> */}
			</div>

			<h3 className="mb-1 text-lg font-bold">{review.title}</h3>
			<p className="text-slate-800">{review.description}</p>
		</article>
	);
};
