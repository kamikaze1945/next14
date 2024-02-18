export const formatMoney = (amount: number) => {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	}).format(amount);
};

// export const fetchDataAllPagesByUrl = async (url: string) => {
// 	const res = await fetch(url);
// 	const pages = await res.json();
// 	return pages;
// };
