import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/ui/organisms/Header";
import { Footer } from "@/ui/organisms/Footer";

const inter = Inter({ subsets: ["latin", "latin-ext"] });

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
		<html lang="pl">
			<body className={inter.className}>
				<Header />
				<main className="max-w-dp-12 sm:max-w-wxl mx-auto sm:py-16 md:max-w-4xl lg:max-w-7xl">
					{children}
				</main>
				<Footer />
			</body>
		</html>
	);
}
