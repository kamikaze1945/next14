import { getOrdersByEmail } from "@/api/orders";
import { PageTitle } from "@/ui/atoms/PageTitle";
import { formatMoney } from "@/utils";
import { auth, currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface Order {
	lines: Line[];
	status: string;
	totalAmount: number;
	id: string;
}

interface Line {
	id: string;
}
export default async function OrderPage() {
	const user = await currentUser();

	JSON.stringify(user);
	if (!user) {
		redirect("/sign-in");
	}

	const email = user.emailAddresses[0]?.emailAddress;
	if (!email) {
		return <div>User does not have email</div>;
	}

	const ordersResponse = await getOrdersByEmail("test@test.pl");

	return (
		<div>
			{ordersResponse?.orders?.data?.length === 0 ? (
				<div>No orders found</div>
			) : (
				<div>
					<section className="relative">
						<div className="lg-6 mx-auto w-full max-w-7xl px-4 md:px-5">
							<PageTitle param="Order" />

							{ordersResponse?.orders?.data.map((order) => (
								<div
									key={order.id}
									className="grid grid-cols-1 border-t border-gray-200 py-6 min-[550px]:gap-6 lg:grid-cols-2"
								>
									{order?.lines !== undefined &&
										Array.isArray(order?.lines) && (
											<div>
												<div className="flex  flex-col items-center gap-3 max-xl:mx-auto max-xl:max-w-xl max-xl:justify-center min-[550px]:flex-row min-[550px]:gap-6">
													<div
														key={order.lines[0]?.id}
														className="pro-data w-full max-w-sm "
													>
														<h5 className="text-xl font-semibold leading-8 text-black max-[550px]:text-center">
															{order.lines[0]?.id}{" "}
															{order.lines[0]?.productName}
														</h5>
														<p className="my-2 text-lg font-normal leading-8 text-gray-500 max-[550px]:text-center min-[550px]:my-3">
															Quantity:{" "}
															{order.lines[0]?.productQuantity}
														</p>
													</div>
												</div>
												<div className=" items-center gap-2 max-xl:mx-auto max-xl:max-w-xl min-[550px]:flex-row">
													<h6 className="text-lg font-medium leading-8 max-[550px]:text-center">
														Price:{" "}
														<span className=" text-indigo-600 ">
															{formatMoney(
																order.lines[0]?.productPrice,
															)}
														</span>
													</h6>
												</div>
											</div>
										)}
								</div>
							))}

							<div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"></div>
						</div>
					</section>

					{/* <ul>
						{ordersResponse?.orders?.data.map((order) => (
							<li key={order.id} className="mb-3">
								<h3>Order: {order.id}</h3>
								<ul>
									<li>Total amount: {order.totalAmount}</li>
									<li>Status order: {order.status}</li>
									{order?.lines === null ? (
										<li>No products</li>
									) : (
										<div>
											{
												order?.lines !== undefined &&
													Array.isArray(order?.lines) && (
														<ul>
															<li key={order.lines[0]?.id}></li>
															<li
																key={order.lines[0]?.productName}
															></li>
															<li key={order.lines[0]?.price}></li>
														</ul>
													)
											}
										</div>
									)}
								</ul>
							</li>
						))}
					</ul> */}
				</div>
			)}
		</div>
	);
}
