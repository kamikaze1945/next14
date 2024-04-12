import { ImageResponse } from "next/og";
import { getProductById } from "@/api/products";

export const runtime = "edge";

export const size = {
	width: 1200,
	height: 630,
};

export const contentType = "image/png";

export default async function OpenGraphImage({
	params,
}: {
	params: { slug: string };
}) {
	const product = await getProductById(params.slug);

	if (!product) {
		return;
	}

	return new ImageResponse(
		(
			<div
				style={{
					width: "100%",
					height: "100%",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					textAlign: "center",
				}}
			>
				{product?.images[0] && (
					<img
						src={product.images[0]?.url}
						width={300}
						height={300}
						alt={product.name}
					/>
				)}
				<div
					style={{
						width: 800,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
						flexWrap: "wrap",
					}}
				>
					<h1
						style={{
							fontSize: 54,
						}}
					>
						{product?.name}
					</h1>
					<p>{product.description}</p>
					{product?.categories[0] && (
						<p>Category: {product.categories[0]?.name}</p>
					)}
				</div>
			</div>
		),
		{
			...size,
		},
	);
}
