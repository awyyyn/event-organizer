import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const inter = Poppins({
	subsets: ["latin"],
	weight: "400",
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
		<html lang="en">
			<body className={inter.className}>{children}</body>
		</html>
	);
}
