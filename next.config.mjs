import MDX from "@next/mdx";
import createNextIntlPlugin from "next-intl/plugin";

const withMDX = MDX({});
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		typedRoutes: true,
		mdxRs: true,
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "static-ourstore.hyperfunctor.com",
				port: "",
				pathname: "/**",
			},
		],
	},
	redirects: async () => {
		return [
			{
				source: "/products/",
				destination: "/products/1",
				permanent: false,
			},
			{
				source: "/products/t-shirts",
				destination: "/products/t-shirts/1",
				permanent: false,
			},
			{
				source: "/products/hoodies",
				destination: "/products/hoodies/1",
				permanent: false,
			},
			{
				source: "/products/accessories",
				destination: "/products/accessories/1",
				permanent: false,
			},
			{
				source: "/collesctions",
				destination: "/collesctions/summer-vibes",
				permanent: false,
			},
		];
	},
};

export default withNextIntl(withMDX(nextConfig));
