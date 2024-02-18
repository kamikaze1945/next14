import { PaginationAllPages } from "@/ui/molecules/PaginationAllPages";

type PaginationProps = {
	pageNumber: number;
	totalPages: number;
	typePagination?: string;
};
export const Pagination = ({
	pageNumber,
	totalPages,
	typePagination = "all",
}: PaginationProps) => {
	return (
		<section
			aria-label="pagination"
			className="spx-4 bord flex items-center justify-center py-10 sm:px-6 lg:px-0"
		>
			{typePagination === "all" ? (
				<PaginationAllPages
					pageNumber={pageNumber}
					totalPages={totalPages}
				/>
			) : (
				""
			)}
		</section>
	);
};
