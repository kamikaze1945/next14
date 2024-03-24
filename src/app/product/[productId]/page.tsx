import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { CheckIcon } from "lucide-react";
import { cookies } from "next/headers";
import { getProductById } from "@/api/products";
import { ProductCoverImage } from "@/ui/atoms/ProductCoverImage";
import { type ProductsListItemFragment } from "@/gql/graphql";
import { RelatedProductList } from "@/ui/organisms/RelatedProductList";
import { AddToCartButton } from "@/app/product/[productId]/AddToCartButton";
import { addToCart, getOrCreateCart } from "@/api/cart";
import { revalidateTag } from "next/cache";

export const dynamic = "force-dynamic";

export const generateMetadata = async ({
	params,
}: {
	params: { productId: ProductsListItemFragment["id"] };
}): Promise<Metadata> => {
	const product = await getProductById(params.productId);

	return {
		title: `${product?.name} - Next.js Shop`,
		description: `${product?.description}`,
	};
};

//generate static pages when use build production
//TODO: generateStaticParams SingleProductPage
// export const generateStaticParams = async ({
// 	params,
// }: {
// 	params: { productId: ProductsListItemFragment["id"] };
// }) => {
// 	const product = await getProductById(params.productId);

// 	return product;
// };

export default async function SingleProductPage({
	params,
	searchParams,
}: {
	params: { productId: string };
	searchParams: { [key: string]: string | string[] };
}) {
	const referral = searchParams.referral?.toString();

	const product = await getProductById(params.productId);

	if (!product) {
		throw notFound();
	}

	async function addProductToCartAction(_formData: FormData) {
		"use server";

		const cart = await getOrCreateCart(params.productId);
		if (cart?.id) {
			await addToCart(cart.id, params.productId);
		}
		revalidateTag("cart");
	}

	return (
		<>
			<article
				className="mx-auto grid max-w-7xl py-8"
				data-referral={referral}
			>
				<Suspense aria-busy="true">
					<div className="grid grid-cols-2 gap-4">
						{product.images[0] && (
							<ProductCoverImage src={product.images[0].url} alt="" />
						)}

						<div className="px-6">
							<h1 className="flex-auto text-3xl font-bold tracking-tighter text-black">
								{product?.name}
							</h1>
							<div className="mt-4 flex items-center">
								${product?.price}
							</div>
							{/* <ProductItemDescription product={product} /> */}
							<div className="mt-4 space-y-6">
								{product?.description}
							</div>
							<div className="mt-4 flex items-center">
								<CheckIcon
									className="mr-1 h-4 w-4 text-green-500"
									aria-hidden="true"
								/>
								<p className="m-2 text-sm font-semibold text-slate-500">
									In stock
								</p>
							</div>
							<form action={addProductToCartAction}>
								<input
									type="text"
									name="productId"
									value={product.id}
									hidden
									readOnly
								/>
								<AddToCartButton />
							</form>
						</div>
					</div>
				</Suspense>
			</article>
			{/* <aside>
				<Suspense aria-busy="true">
					<RelatedProductList
						params={{
							categorySlug: product?.categories[0]?.slug || undefined,
						}}
					/>
				</Suspense>
			</aside> */}
		</>
	);
}
