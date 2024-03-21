"use client";

import { useState, useEffect, Suspense } from "react";
import clsx from "clsx";
import { ShoppingCart } from "lucide-react";
import { ActiveLink } from "@/ui/atoms/ActiveLink";
import { Logo } from "@/ui/atoms/Logo";
import { routes } from "@/const/routes";
import { SearchNavbar } from "@/ui/atoms/SearchNavbar";
import { getCartIdFromCookies } from "@/api/cart";

export const Navigation = () => {
	const [quantityProduct, setQuantityProduct] = useState(0);
	const [navIsOpen, setNavIsOpen] = useState(false);
	const onClickOutside = () => {
		setNavIsOpen(false);
	};
	useEffect(() => {
		const fetchCart = async () => {
			const cart = await getCartIdFromCookies();
			const quantity =
				cart?.items?.reduce((acc, item) => acc + item.quantity, 0) ||
				0;
			setQuantityProduct(quantity);
		};
		fetchCart();
	}, [quantityProduct]);

	useEffect(() => {
		if (navIsOpen) {
			document.addEventListener("click", onClickOutside);
		} else {
			document.removeEventListener("click", onClickOutside);
		}
		return () => {
			document.removeEventListener("click", onClickOutside);
		};
	}, [navIsOpen]);

	return (
		<nav className="border-gray-200 bg-white py-2.5 dark:bg-gray-900">
			<div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between px-4">
				<ActiveLink href="/" className="flex items-center">
					<Logo />
				</ActiveLink>
				<div className="flex items-center lg:order-2">
					<div className="mr-4 mt-2 hidden sm:inline-block">
						<span></span>
					</div>
					<Suspense fallback={<div>Loading...</div>}>
						<SearchNavbar />
					</Suspense>
					<div className="ml-4 flex items-center">
						<ActiveLink href="/cart" className="flex items-center">
							<ShoppingCart />
							<span className="ml-1 ">{quantityProduct}</span>
						</ActiveLink>
					</div>
					<div
						className="ml-1 inline-flex cursor-pointer items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 lg:hidden dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
						aria-controls="mobile-menu-2"
						aria-expanded="true"
						onClick={() => setNavIsOpen(true)}
					>
						<span className="sr-only">Open main menu</span>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M4 6h16M4 12h16M4 18h7"
							/>
						</svg>
					</div>
				</div>
				<div
					className={clsx(
						"w-full items-center justify-between  lg:order-1 lg:flex lg:w-auto",
						{
							hidden: !navIsOpen,
						},
					)}
				>
					<ul className="mt-4 flex flex-col font-medium lg:mt-0 lg:flex-row lg:space-x-8">
						{routes.map((route) => (
							<ActiveLink
								exact={route.label === "Home"}
								key={route.label}
								href={route.href}
								title={route.label}
								activeClassName="block lg:bg-transparent lg:p-0 lg:text-purple-700"
							>
								{route.label}
							</ActiveLink>
						))}
					</ul>
				</div>
			</div>
		</nav>
	);
};
