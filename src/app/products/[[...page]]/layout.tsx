type ProductsLayoutProps = {
	children: React.ReactNode;
	params: {
		page: string[];
	};
};

export default async function ProductsLayout({
	children,
	params,
}: ProductsLayoutProps) {
	return (
		<>
			<section>{children}</section>
		</>
	);
}
