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
