import { notFound } from "next/navigation";
import { type Metadata } from "next";
import { getProductsByCollectionSlug } from "@/api/products";
import { ProductList } from "@/ui/organisms/ProductList";
import React from "react";
import { PageTitle } from "@/ui/atoms/PageTitle";

export const dynamic = "force-dynamic";

type CollectionsPrdoductPageProps = {
	params: {
		slug: string;
	};
};

export const generateMetadata = async ({
	params,
}: CollectionsPrdoductPageProps): Promise<Metadata> => {
	const products = await getProductsByCollectionSlug(params.slug);

	let productName = "Collections best product";
	let productDescription = "Get collections best product now!";

	if (products && products.length > 0) {
		productName = products[0].name;
		productDescription = products[0].description;
	}

	return {
		title: `Collections`,
		description: `${productDescription}`,
	};
};

export const generateStaticParams = async () => {
	const products = await getProductsByCollectionSlug("summer-vibes");

	return products.map((product) => ({
		params: { productId: product.id },
	}));
};
export default async function CollectionsPrdoductPage({
	params,
}: CollectionsPrdoductPageProps) {
	const products = await getProductsByCollectionSlug(params.slug);

	if (!products) {
		throw notFound();
	}

	const pageTitle = `Collections`;
	return (
		<>
			<PageTitle param={pageTitle} />
			<ProductList products={products || []} />
		</>
	);
}
