export type ProductItemType = {
	id: string;
	title: string;
	category: string;
	price: number;
	description: string;
	longDescription: string;
	coverImage: {
		src: string;
		alt: string;
	};
	rating: Rating;
};

export type ProductResponseItem = {
	id: string;
	title: string;
	price: number;
	description: string;
	longDescription: string;
	category: string;
	rating: Rating;
	image: string;
};

export type Rating = {
	rate: number;
	count: number;
};
