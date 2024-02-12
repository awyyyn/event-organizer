import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ourFileRouter } from "./api/uploadthing/core";
import { extractRouterConfig } from "uploadthing/server";
import { Toaster } from "@/components/ui/toaster";

const inter = Poppins({
	subsets: ["devanagari", "latin", "latin-ext"],
	weight: ["300", "400", "500", "600", "700"],

	variable: "--font-poppins",
});

export const metadata: Metadata = {
	title: "EventOrg",
	description: "EventOrg is a platform for organizing and managing events",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider>
			<html lang="en" suppressHydrationWarning>
				<body className={inter.className}>
					<NextSSRPlugin
						/**
						 * The `extractRouterConfig` will extract **only** the route configs
						 * from the router to prevent additional information from being
						 * leaked to the client. The data passed to the client is the same
						 * as if you were to fetch `/api/uploadthing` directly.
						 */
						routerConfig={extractRouterConfig(ourFileRouter)}
					/>
					<Toaster />
					{children}
				</body>
			</html>
		</ClerkProvider>
	);
}
