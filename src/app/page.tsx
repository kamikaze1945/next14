import { ProductCoverImage } from "@/ui/atoms/ProductCoverImage";
import { ProductListItem } from "@/ui/molecules/ProductListItem";
import { ProductList } from "@/ui/organisms/ProductList";
import { ProductItemType } from "@/ui/types";
import Image from "next/image";

const products: ProductItemType[] = [
	{
		id: "1",
		name: "Product 1",
		category: "Category 1",
		price: 100,
		coverImage: {
			src: "https://picsum.photos/320",
			alt: "Product 1",
		},
	},
	{
		id: "2",
		name: "Product 2",
		category: "Category 2",
		price: 200,
		coverImage: {
			src: "https://api.lorem.space/image/game?w=320&h=320",
			alt: "Product 2",
		},
	},
	{
		id: "3",
		name: "Product 3",
		category: "Category 3",
		price: 300,
		coverImage: {
			src: "https://api.lorem.space/image/fashion?w=320&h=320",
			alt: "Product 3",
		},
	},
	{
		id: "4",
		name: "Product 4",
		category: "Category 4",
		price: 400,
		coverImage: {
			src: "https://api.lorem.space/image/face?w=320&h=320",
			alt: "Product 4",
		},
	},
	{
		id: "5",
		name: "Product 5",
		category: "Category 5",
		price: 500,
		coverImage: {
			src: "https://api.lorem.space/image/finance?w=320&h=320",
			alt: "Product 5",
		},
	},
	{
		id: "6",
		name: "Product 6",
		category: "Category 6",
		price: 600,
		coverImage: {
			src: "https://api.lorem.space/image/album?w=320&h=320",
			alt: "Product 6",
		},
	},
	{
		id: "7",
		name: "Product 7",
		category: "Category 7",
		price: 700,
		coverImage: {
			src: "https://api.lorem.space/image/dashboard?w=320&h=320",
			alt: "Product 7",
		},
	},
	{
		id: "8",
		name: "Product 8",
		category: "Category 8",
		price: 800,
		coverImage: {
			src: "https://picsum.photos/seed/picsum/200/300",
			alt: "Product 8",
		},
	},
];

export default function Home() {
	return (
		<section className="max-w-dp-12 sm:max-w-wxl mx-auto sm:py-16 md:max-w-4xl lg:max-w-7xl">
			<ProductList products={products} />
		</section>
	);
}
