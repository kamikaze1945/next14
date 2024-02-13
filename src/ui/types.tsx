export type ProductItemType = {
	id: string;
	name: string;
	category: string;
	price: number;
	coverImage: {
		src: string;
		alt: string;
	};
	desription: string;
};

export type ProductResponseItem = {
	id: string;
	title: string;
	price: number;
	description: string;
	category: string;
	rating: Rating;
	image: string;
};

export type Rating = {
	rate: number;
	count: number;
};
