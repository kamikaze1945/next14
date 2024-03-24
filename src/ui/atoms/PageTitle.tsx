import { type ReactNode } from "react";

export const PageTitle = ({ param }: { param: string }) => {
	return (
		<header>
			<h1 className="border-b border-gray-200 py-2 text-3xl font-semibold">
				{param}
			</h1>
		</header>
	);
};
