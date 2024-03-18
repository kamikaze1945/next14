//import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { CheckIcon } from "lucide-react";
import { cookies } from "next/headers";
import { getProductById } from "@/api/products";
import { ProductCoverImage } from "@/ui/atoms/ProductCoverImage";
import {
	CardCreateDocument,
	CartAddProductDocument,
	CartChangeItemQuantityDocument,
	CartGetByIdDocument,
	ProductGetByIdDocument,
	type ProductsListItemFragment,
} from "@/gql/graphql";
import { RelatedProductList } from "@/ui/organisms/RelatedProductList";
import { executeGraphql } from "@/api/graphqlApi";

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
		console.log(_formData);

		const cart = await getOrCreateCart(params.productId);
		console.log("addProductToCartAction:cart: ", cart);
		if (cart?.id) {
			console.log("addProductToCartAction:cookieSave: ", cart.id);
			cookies().set("cartId", cart.id, {
				httpOnly: true,
				sameSite: "lax",
				//secure: true, // only work on production
			});

			await addToCart(cart.id, params.productId);
		}
	}

	return (
		<>
			<article
				className="mx-auto grid max-w-7xl py-8"
				data-referral={referral}
			>
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
							<button
								type="submit"
								className="m-3 me-5 w-full transform rounded-lg bg-gradient-to-br from-green-400 to-blue-600 px-5 py-4 text-center text-sm font-medium text-white transition-transform hover:bg-gradient-to-bl focus:outline-none focus:ring-4  focus:ring-green-200 active:scale-95 dark:focus:ring-green-800"
							>
								Add to cart
							</button>
						</form>
					</div>
				</div>
			</article>
			<aside>
				<Suspense>
					<RelatedProductList
						params={{
							categorySlug: product?.categories[0]?.slug || undefined,
						}}
					/>
				</Suspense>
			</aside>
		</>
	);
}

async function getOrCreateCart(productId: string) {
	console.log("Start getOrCreateCart");
	const cartId = cookies().get("cartId")?.value || "";

	console.log("getOrCreateCart:cartId: ", cartId);
	if (cartId) {
		const cardData = await getCardById(cartId);

		if (cardData !== undefined && cardData?.cart?.id !== null) {
			console.log("getOrCreateCart:getCardById: ", cardData);
			return cardData?.cart;
		}
	}

	const cardData = await createCart(cartId, productId, 1);
	if (cardData?.cartFindOrCreate === null) {
		throw new Error("Error create new Cart order");
	}

	return cardData.cartFindOrCreate;
}

async function getCardById(cartId: string) {
	return executeGraphql(CartGetByIdDocument, { id: cartId });
}

function createCart(
	cartId: string,
	productId: string,
	quantity: number = 1,
) {
	const resultData = executeGraphql(CardCreateDocument, {
		id: cartId,
		productId: productId,
		quantity: quantity,
	});

	console.log("createCart:resultData: ", resultData);
	return resultData;
}

async function addToCart(
	cartId: string,
	productId: string,
	quantity: number = 1,
) {
	const { product } = await executeGraphql(ProductGetByIdDocument, {
		id: productId,
	});
	if (!product) {
		throw new Error("Product not found");
	}

	const cardData = await getCardById(cartId);

	if (
		cardData !== undefined &&
		cardData?.cart?.id !== null &&
		cardData?.cart?.items &&
		cardData?.cart?.items.length > 0
	) {
		const cart = cardData.cart;

		for (const item of cart.items) {
			if (item.product.id === productId) {
				quantity = item.quantity + 1;
				console.log(
					`Product IDssssss: ${item.product.id}, Name: ${item.product.name}, Quantity: ${item.quantity} , item.quantity ${item.quantity}  Quantity: ${quantity}`,
				);
				await executeGraphql(CartChangeItemQuantityDocument, {
					id: cartId,
					productId: productId,
					quantity: quantity,
				});

				return true;
			}
		}
	}

	await executeGraphql(CartAddProductDocument, {
		id: cartId,
		productId: productId,
		quantity: quantity,
	});

	return true;
}
