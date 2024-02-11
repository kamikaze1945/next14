export const generateStaticParams = async ({
	params: { category },
}: {
	params: { category: string };
}) => {
	if (category === "t-shirts") {
		return [{ pageNumber: "1" }, { pageNumber: "2" }];
	} else {
		return [{ pageNumber: "1" }];
	}
};

export default function SingleCategoryProductList({
	params: { category, pageNumber },
}: {
	params: { category: string; pageNumber: string };
}) {
	return (
		<>
			<h1 className="text-4xl  font-bold">Category products</h1>
			<p className="text-lg">
				{category} / {pageNumber}
			</p>
		</>
	);
}
