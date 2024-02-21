export type ProductItemType = {
	id: string;
	name: string;
	description: string;
	category: string;
	price: number;
	coverImage:
		| {
				src: string;
				alt: string;
		  }
		| undefined;
};

export type ProductResponseItem = {
	id: string;
	name: string;
	price: number;
	description: string;
	category: string;
	image: string;
};

export type Rating = {
	rate: number;
	count: number;
};
