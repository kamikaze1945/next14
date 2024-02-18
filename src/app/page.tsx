import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Home",
	description: "Home page - welcome",
};

export default function Home() {
	return (
		<>
			<article>
				<h1 className="text-4xl font-bold">Home</h1>
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
