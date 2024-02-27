"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { type Route } from "next";
import { useDebouncedCallback } from "use-debounce";

export const SearchNavbar = () => {
	const searchParams = useSearchParams();
	const router = useRouter();

	const handleSearch = useDebouncedCallback(
		(searchTearms: string) => {
			console.log(searchTearms);
			const params = new URLSearchParams(searchParams);
			if (searchTearms) {
				params.set("query", searchTearms);
			} else {
				params.delete("query");
			}

			const url =
				searchTearms !== ""
					? `/search?${params.toString()}`
					: "/products";
			router.replace(url as Route);
		},
		500,
	);

	return (
		<div
			data-testid="search-navbar"
			className="flex items-center justify-between bg-white p-4"
		>
			<div className="relative flex items-center">
				<Search className="h4 absolute left-3 top-2 w-4 text-gray-400" />
				<input
					data-testid="search-navbar-input"
					type="text"
					placeholder="Search"
					className="w-64 rounded border border-gray-300 p-2 pl-10"
					onChange={(e) => {
						handleSearch(e.target.value);
					}}
				/>
			</div>
		</div>
	);
};
