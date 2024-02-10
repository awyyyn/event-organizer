import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

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
			<html lang="en">
				<body className={inter.className}>{children}</body>
			</html>
		</ClerkProvider>
	);
}
