interface Order {
	id: string;
	totalAmount: number;
	status: string;
	lines: OrderLineItem[];
}
interface OrderLineItem {
	id: string;
	price: number;
	quantity: number;
	productName: string;
}
