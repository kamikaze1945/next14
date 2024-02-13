"use client";

import clsx from "clsx";
import Link from "next/link";
import type { Route } from "next";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export const ActiveLink = <T extends string>({
	href,
	children,
	title,
	exact = false,
	className = "text-blue-400 hover:text-blue-600",
	activeClassName = "underline",
}: {
	href: Route<T> | URL;
	children: ReactNode;
	exact?: boolean;
	title?: string;
	className?: string;
	activeClassName?: string;
}) => {
	const pathname = usePathname();
	const isActive = pathname === href;
	
	return (
		<Link
			href={href}
			aria-current={isActive ? "page" : undefined}
			className={clsx(className, {
				[activeClassName]: isActive,
			})}
			passHref
		>
			{children}
		</Link>
	);
};
