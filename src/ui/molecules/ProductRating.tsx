export const ProductRating = ({ rating }: { rating?: number }) => {
	return (
		<div className="flex grid h-8 grid-cols-2 items-center justify-between ">
			<div className="flex items-center text-sm text-gray-700">
				<span>Rating: </span>
				<span data-testid="product-rating">
					{rating !== 0 && rating !== undefined
						? rating.toFixed(2)
						: 0}
					/5
				</span>
			</div>
			<div className="text-right ">
				<div className="inline-flex ">
					{[0, 1, 2, 3, 4].map((ratingItem) => (
						<svg
							key={ratingItem}
							className={`h-5 w-5 shrink-0 ${
								ratingItem < Math.floor(rating || 0)
									? "fill-amber-400"
									: "fill-gray-300"
							}`}
							viewBox="0 0 256 256"
						>
							<path d="M239.2 97.4A16.4 16.4.0 00224.6 86l-59.4-4.1-22-55.5A16.4 16.4.0 00128 16h0a16.4 16.4.0 00-15.2 10.4L90.4 82.2 31.4 86A16.5 16.5.0 0016.8 97.4 16.8 16.8.0 0022 115.5l45.4 38.4L53.9 207a18.5 18.5.0 007 19.6 18 18 0 0020.1.6l46.9-29.7h.2l50.5 31.9a16.1 16.1.0 008.7 2.6 16.5 16.5.0 0015.8-20.8l-14.3-58.1L234 115.5A16.8 16.8.0 00239.2 97.4z"></path>
						</svg>
					))}
				</div>
			</div>
		</div>
	);
};
