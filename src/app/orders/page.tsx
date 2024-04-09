import { getOrdersByEmail } from "@/api/orders";
import { auth, currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

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

	let email2 = "test@test.pl"; //todo: delete value
	const ordersResponse = await getOrdersByEmail(email2);

	return (
		<div>
			<h1>{user.firstName} Orders</h1>
			<h3>
				EMAIL: {user.emailAddresses[0]?.emailAddress}
				{/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
			</h3>

			{ordersResponse?.orders?.data?.length === 0 ? (
				<div>No orders found</div>
			) : (
				<div>
					<ul>
						{ordersResponse?.orders?.data.map((order) => (
							<li key={order.id} className="mb-3">
								<h3>Order: {order.id}</h3>
								<ul>
									<li>Total amount: {order.totalAmount}</li>
									<li>Status order: {order.status}</li>
									<li>
										{order.lines.map((item) => {
											<li key={item.id}>
												<h4>Product name: {item.productName}</h4>
												<p>Quantity: {item.quantity}</p>
												<p>Price: {item.price}</p>
											</li>;
										})}
									</li>
								</ul>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
}
