import { Hamburger } from "@/ui/atoms/Hamburger";
import { Logo } from "@/ui/atoms/Logo";
import { Navigation } from "@/ui/molecules/Navigation";
import Link from "next/link";

export const Header = () => {
	return (
		<header className="ax-w-dp-12 sm:max-w-wxl sticky top-0 z-10 mx-auto w-full items-center justify-between border border-gray-200 bg-gray-50 	">
			<Navigation />
		</header>
	);
};
