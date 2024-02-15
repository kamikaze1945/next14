import { ActiveLink } from "@/ui/atoms/ActiveLink";
import type { Route } from "next";

type PaginationProps = {
	pageNumber: number;
	totalPages: number;
};
export const Pagination = ({
	pageNumber,
	totalPages,
}: PaginationProps) => {
	return (
		<section
			aria-label="pagination"
			className="flex items-center justify-center px-4 py-10 sm:px-6 lg:px-0"
		>
			<div className="flex w-full  items-center justify-between border-t border-gray-200 lg:w-3/5">
				<div>
					<ActiveLink
						className="flex cursor-pointer items-center pt-3 text-gray-600 hover:text-blue-600"
						activeClassName=""
						href={
							pageNumber === 1
								? ("/products" as Route)
								: `/products/${pageNumber - 1}`
						}
						title="Previous page"
					>
						<svg
							width="14"
							height="8"
							viewBox="0 0 14 8"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M1.1665 4H12.8332"
								stroke="currentColor"
								strokeWidth="1.25"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								d="M1.1665 4L4.49984 7.33333"
								stroke="currentColor"
								strokeWidth="1.25"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								d="M1.1665 4.00002L4.49984 0.666687"
								stroke="currentColor"
								strokeWidth="1.25"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
						<p className="ml-3 text-sm font-medium leading-none ">
							Previous
						</p>
					</ActiveLink>
				</div>
				<div className="hidden sm:flex">
					{Array.from({ length: totalPages }, (_, i) => (
						<ActiveLink
							className="mr-4 cursor-pointer border-t px-2 pt-3 text-sm font-medium leading-none"
							activeClassName={
								i === pageNumber - 1
									? "border-blue-400 text-blue-600"
									: "border-transparent text-gray-600 hover:border-blue-400 hover:text-blue-600"
							}
							key={i}
							href={
								i === 0
									? ("/products" as Route)
									: `/products/${i + 1}`
							}
							title={
								i === pageNumber - 1
									? `Current page ${pageNumber}`
									: `Go to page ${i + 1}`
							}
						>
							{i + 1}
						</ActiveLink>
					))}
				</div>
				<div className="">
					<ActiveLink
						className="flex cursor-pointer items-center pt-3 text-gray-600 hover:text-blue-600"
						activeClassName=""
						href={
							pageNumber === totalPages
								? `/products/${totalPages}`
								: `/products/${pageNumber + 1}`
						}
						title="Next page"
					>
						<p className="mr-3 text-sm font-medium leading-none">
							Next
						</p>
						<svg
							width="14"
							height="8"
							viewBox="0 0 14 8"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M1.1665 4H12.8332"
								stroke="currentColor"
								strokeWidth="1.25"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								d="M9.5 7.33333L12.8333 4"
								stroke="currentColor"
								strokeWidth="1.25"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								d="M9.5 0.666687L12.8333 4.00002"
								stroke="currentColor"
								strokeWidth="1.25"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</ActiveLink>
				</div>
			</div>
		</section>
	);
};
