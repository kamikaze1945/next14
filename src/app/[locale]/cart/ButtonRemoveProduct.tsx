"use client";

import { removeItemProduct } from "@/app/[locale]/cart/action";
import { startTransition, useTransition } from "react";
import { useRouter } from "next/navigation";

export const ButtonRemoveProduct = ({
	cartId,
	productId,
}: {
	cartId: string;
	productId: string;
}) => {
	const [isPending, setIsPending] = useTransition();
	const router = useRouter();
	return (
		<button
			className="text-red-500 disabled:text-slate-300"
			disabled={isPending}
			onClick={() => {
				startTransition(() => {
					removeItemProduct(cartId, productId);
					router.refresh();
				});
			}}
		>
			Remove
		</button>
	);
};
