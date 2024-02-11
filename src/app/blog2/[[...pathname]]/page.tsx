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

export default async function BlogPage({
	params,
}: {
	params: { pathname: string[] };
}) {
	const { pathname } = params;
	const pathname2 = pathname?.join("/") ?? [];

	return <div>Blog Page: {pathname2}</div>;
	// Next options loading template
	//  const {default: Page} = await import(`src/app/blog/${page}/page`);
	//  return <Page />;
}
