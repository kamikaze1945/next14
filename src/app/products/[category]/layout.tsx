export const generateStaticParams = async () => {
	return [{ category: "t-shirts"}, { category: "suits"}];
};

export default function SingleCategoryProductLayout({children}: {children: React.ReactNode}) {
    return (
        <div
            data-testid="group-layout-single-category-product"
            className="mx-auto max-w-md text-center"
        >
            {children}
        </div>
    );
}