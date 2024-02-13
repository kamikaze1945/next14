/* use [[..params]] - two [[]] give options display page
 * /blog
 * /blog/123
 * /blog/123/456
 *
 * use structure
 *  use [..params] - can display only page
 *  /blog - return error(wrong construction)
 * /blog/123 or /blog/123/456 - work perfect
 */

import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Blog example page",
	description:
		"Blog example `[[...pathname]]` - you can find here all blog pages.",
};

export default async function BlogPage({
	params,
}: {
	params: { pathname: string[] };
}) {
	const { pathname } = params;
	const pathname2 = pathname?.join("/") ?? [];

	return (
		<article>
			<h1 className="text-4xl font-bold">Blog  {pathname2}`</h1>
			<div>
				Lorem ipsum Lorem ipsum dolor sit amet, consectetur
				adipisicing elit. Unde dignissimos qui ut hic, illum quod quis
				excepturi nostrum omnis quae voluptatum in quia voluptate eum
				possimus animi error iusto veniam.
			</div>
		</article>
	);

	// Next options loading template
	//  const {default: Page} = await import(`src/app/blog/${page}`);
	//  return <Page />;
}
