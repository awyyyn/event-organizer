/** @type {import('next').NextConfig} */
const nextConfig = {
	// skipMiddlewareUrlNormalize
	images: {
		remotePatterns: [
			{
				protocol: "https",
				port: "",
				hostname: "utfs.io",
				pathname: "/f/**",
			},
		],
	},
};

export default nextConfig;
// https:/utfs.io/f/032db031-bfb4-43e8-bf91-965f8b8a10e6-h3tqki.jpg
