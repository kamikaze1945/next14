import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Cateogry products",
	description:
		"Category products list - you can find here all products.",
};

export default function SingleCategoryProductList({
	params: { category },
}: {
	params: { category: string };
}) {
	return (
		<>
			<h1 className="text-4xl  font-bold">Category products</h1>
			<p className="text-lg">{category}</p>
		</>
	);
}
