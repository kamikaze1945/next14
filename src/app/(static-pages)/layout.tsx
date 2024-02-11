export default function StaticLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div
			data-testid="group-layout-static"
			className="mx-auto max-w-md text-center"
		>
			{children}
		</div>
	);
}
