"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { type Route } from "next";
import { useEffect, useState } from "react";

export const ProductSortSelect = () => {
	const [currentSortSelectedInUrl, setCurrentSortSelectedInUrl] =
		useState("");
	const sortParams = useSearchParams();
	const router = useRouter();

	useEffect(() => {
		const params = new URLSearchParams(sortParams);
		const sortUrlSelected = sortParams.get("sort");
		setCurrentSortSelectedInUrl(sortUrlSelected || "");
		console.log("URRRRRLL", sortUrlSelected);
	}, []);

	const onChangeSortProducts = (
		event: React.ChangeEvent<HTMLSelectElement>,
	) => {
		// get value select current change in select
		const sortValueOnChange = event.target.value;
		setCurrentSortSelectedInUrl(sortValueOnChange);
		// get query from browser url
		const params = new URLSearchParams(sortParams);

		if (sortValueOnChange) {
			params.set("sort", sortValueOnChange);
		} else {
			params.delete("sort");
		}

		const url = `/products?${params.toString()}`;
		router.replace(url as Route);
	};

	return (
		<div className="min-w-[250px] content-end lg:mb-0 lg:ms-8">
			<div>
				<div className="inline-flex font-bold sm:text-sm">
					Sort by
				</div>
				<div className=" inline-flex">
					<select
						className="form-select w-full py-2 pe-4"
						value={currentSortSelectedInUrl}
						name="sort"
						onChange={onChangeSortProducts}
					>
						<option value="price" data-testid="sort-by-price">
							Price: Low to High
						</option>
						<option value="-price" data-testid="sort-by-price">
							Price: High to Low
						</option>
						<option value="name" data-testid="sort-by-name">
							Name: A to Z
						</option>
						<option value="-name" data-testid="sort-by-name">
							Name: Z to A
						</option>
						<option value="avgRating" data-testid="sort-by-rating">
							Rating: Low to High
						</option>
						<option value="-avgRating" data-testid="sort-by-rating">
							Rating: High to Low
						</option>
					</select>
				</div>
			</div>
		</div>
	);
};
