import { getCartIdFromCookies } from "@/api/cart";
import { Navigation } from "@/ui/molecules/Navigation";

export async function Header() {
	const cart = await getCartIdFromCookies();
	const quantity =
		cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0;
	return (
		<header className="ax-w-dp-12 sm:max-w-wxl sticky top-0 z-10 mx-auto w-full items-center justify-between border border-gray-200 bg-gray-50 	">
			<Navigation quantity={quantity} />
		</header>
	);
}
