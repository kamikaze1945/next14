import { Overlay } from "@/ui/atoms/Overlay";
import { getCartIdFromCookies } from "@/api/cart";
import { handlePaymentAction } from "@/app/cart/action";
import Image from "next/image";
import { formatMoney } from "@/utils";
import { ButtonsChangeProductQuantity } from "@/app/cart/ButtonsChangeProductQuantity";
import { ButtonRemoveProduct } from "@/app/cart/ButtonRemoveProduct";

export default async function ModalCart() {
	const cart = await getCartIdFromCookies();

	return (
		<>
			<Overlay />
			<div className="absolute right-0 top-0 z-40 h-screen w-full max-w-sm overflow-auto bg-white">
				<section className="">
					<div className="mx-auto w-full max-w-sm px-4 md:px-5">
						<h2 className="title font-manrope mb-8 text-center text-4xl font-bold leading-10 text-black">
							Shopping Cart
						</h2>
						<div className="hidden grid-cols-2 py-6 lg:grid">
							<div className="text-xl font-normal leading-8 text-gray-500">
								Product
							</div>
							<p className="flex items-center justify-between text-xl font-normal leading-8 text-gray-500">
								<span className="w-full max-w-[260px] text-center">
									Quantity
								</span>
								<span className="w-full max-w-[200px] text-center">
									Total
								</span>
								<span className="w-full max-w-[100px] text-center"></span>
							</p>
						</div>

						{cart?.items.map(
							(item, index) =>
								item.product && (
									<div
										key={index}
										className="grid grid-cols-1 border-t border-gray-200 py-6 lg:grid-cols-2"
									>
										<div className="flex w-full flex-col items-center gap-3 max-xl:mx-auto max-xl:max-w-xl max-xl:justify-center ">
											<div className="img-box">
												<Image
													src={item.product.images[0].url}
													alt={item.product.name}
													width={40}
													height={40}
													className="xl:w-[140px]"
												/>
											</div>
											<div className="pro-data w-full max-w-sm ">
												<h5 className="text-xl font-semibold leading-8 text-black">
													{item.product.name}
												</h5>
												<p className="my-2 text-lg font-normal leading-8 text-gray-500">
													CATEGORY
												</p>
												<h6 className="text-lg font-medium leading-8 text-indigo-600 ">
													{formatMoney(item.product.price)}
												</h6>
											</div>
										</div>
										<div className="flex w-full flex-col items-center gap-2 max-xl:mx-auto max-xl:max-w-xl ">
											<ButtonsChangeProductQuantity
												cartId={cart.id}
												productId={item.product.id}
												quantity={item.quantity}
											/>

											<h6
												data-testid="quantity"
												className="font-manrope w-full max-w-[176px] text-center text-2xl font-bold leading-9 text-indigo-600"
											>
												{formatMoney(
													item.product.price * item.quantity,
												)}
											</h6>
											<ButtonRemoveProduct
												cartId={cart.id}
												productId={item.product.id}
											/>
										</div>
									</div>
								),
						)}

						<div className="mb-8 w-full rounded-xl bg-gray-50 p-6 max-lg:mx-auto max-lg:max-w-xl">
							<div className="mb-6 flex w-full items-center justify-between">
								<p className="text-xl font-normal leading-8 text-gray-400">
									Sub Total
								</p>
								<h6 className="text-xl font-semibold leading-8 text-gray-900">
									$360.00
								</h6>
							</div>
							<div className="flex w-full items-center justify-between border-b border-gray-200 pb-6">
								<p className="text-xl font-normal leading-8 text-gray-400">
									Delivery Charge
								</p>
								<h6 className="text-xl font-semibold leading-8 text-gray-900">
									$45.00
								</h6>
							</div>
							<div className="flex w-full items-center justify-between py-6">
								<p className="font-manrope text-2xl font-medium leading-9 text-gray-900">
									Total
								</p>
								<h6 className="font-manrope text-2xl font-medium leading-9 text-indigo-500">
									$405.00
								</h6>
							</div>
						</div>

						<div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
							<form action={handlePaymentAction}>
								<button className="m-2 flex w-full max-w-[280px] items-center justify-center rounded-full bg-indigo-600 p-4 text-center text-lg font-semibold text-white transition-all duration-500 hover:bg-indigo-700">
									Continue to Payment
									<svg
										className="ml-2"
										xmlns="http://www.w3.org/2000/svg"
										width="23"
										height="22"
										viewBox="0 0 23 22"
										fill="none"
									>
										<path
											d="M8.75324 5.49609L14.2535 10.9963L8.75 16.4998"
											stroke="white"
											strokeWidth="1.6"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
								</button>
							</form>
						</div>
					</div>
				</section>
			</div>
		</>
	);
}
