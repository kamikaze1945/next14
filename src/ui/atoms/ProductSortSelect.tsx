"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { type Route } from "next";
import { useEffect, useState } from "react";

export const ProductSortSelect = () => {
	const [currentSortSelectedInUrl, setCurrentSortSelectedInUrl] =
		useState("default");

	const sortParams = useSearchParams();
	const router = useRouter();

	useEffect(() => {
		const params = new URLSearchParams(sortParams);
		const orderSelected = sortParams.get("order");
		const orderByUrlSelected = sortParams.get("orderBy");

		if (orderSelected && orderByUrlSelected) {
			const orderSelect = `${orderByUrlSelected}_${orderSelected}`;
			setCurrentSortSelectedInUrl(orderSelect);
		}

		console.log("URRRRRLL", orderSelected);
	}, []);

	const onChangeSortProducts = (
		event: React.ChangeEvent<HTMLSelectElement>,
	) => {
		// get value select current change in select
		const sortValueOnChange = event.target.value;
		if (!sortValueOnChange) {
			return;
		}

		const orderSelect = sortValueOnChange || "";
		const orderBy = orderSelect.split("_")[0];
		const order = orderSelect.split("_")[1];

		console.log("order", order);
		console.log("orderBy", orderBy);

		setCurrentSortSelectedInUrl(sortValueOnChange);
		// get query from browser url
		const params = new URLSearchParams(sortParams);

		if (sortValueOnChange) {
			params.set("orderBy", orderBy);
			params.set("order", order);
		} else {
			params.delete("orderBy");
			params.delete("order");
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
						<option disabled value="default" data-testid="default">
							Default
						</option>

						<option value="price_asc" data-testid="sort-by-price">
							Price: Low to High
						</option>
						<option value="price_desc" data-testid="sort-by-price">
							Price: High to Low
						</option>
						<option value="name_asc" data-testid="sort-by-name">
							Name: A to Z
						</option>
						<option value="name_desc" data-testid="sort-by-name">
							Name: Z to A
						</option>
						<option value="rating_asc" data-testid="sort-by-rating">
							Rating: Low to High
						</option>
						<option value="rating_desc" data-testid="sort-by-rating">
							Rating: High to Low
						</option>
					</select>
				</div>
			</div>
		</div>
	);
};
