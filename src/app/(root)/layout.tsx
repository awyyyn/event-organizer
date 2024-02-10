import Header from "@/components/shared/header";

export default function layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div>
			<Header />
			<main className="mt-16">{children}</main>
		</div>
	);
}
