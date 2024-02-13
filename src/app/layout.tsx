import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ActiveLink } from "@/ui/atoms/ActiveLink";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Products",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<nav>
					<ul className="mt-2 flex justify-center space-x-4 ">
						<li>
							<ActiveLink href="/" exact title="Home">
								Home
							</ActiveLink>
						</li>
						<li>
							<ActiveLink
								href="/products"
								partialMatch={true}
								title="All products"
							>
								All
							</ActiveLink>
						</li>
					</ul>
				</nav>

				<section className="max-w-dp-12 sm:max-w-wxl mx-auto sm:py-16 md:max-w-4xl lg:max-w-7xl">
					{children}
				</section>
				<footer className="py-8 text-center text-sm text-gray-500">
					© 2024
				</footer>
			</body>
		</html>
	);
}
