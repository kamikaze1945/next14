type ProductsLayoutProps = {
	children: React.ReactNode;
	params: {
		page: string[];
	};
};

export default async function ProductsLayout({
	children,
}: ProductsLayoutProps) {
	return (
		<>
			<section>{children}</section>
		</>
	);
}
