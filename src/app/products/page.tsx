import { getProductList } from "@/api/products";
import { ProductList } from "@/ui/organisms/ProductList";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "All products",
	description: "Products list - you can find here all products.",
};

export default async function ProductsPage() {
	const products = await getProductList();
	return (
		<>
			<ProductList products={products} />;
		</>
	);
}
