import { type Metadata } from "next";

export const metadata: Metadata = {
	title: "Blog page",
	description: "Blog example - you can find here all blog pages.",
};

export default function Test2Page({
	params: { data },
}: {
	params: { data: string };
}) {
	return (
		<>
			<article>
				<h1 className="text-4xl font-bold">Blog {data}</h1>
				<div>
					Lorem ipsum Lorem ipsum dolor sit amet, consectetur
					adipisicing elit. Unde dignissimos qui ut hic, illum quod
					quis excepturi nostrum omnis quae voluptatum in quia
					voluptate eum possimus animi error iusto veniam.
				</div>
			</article>
		</>
	);
}
