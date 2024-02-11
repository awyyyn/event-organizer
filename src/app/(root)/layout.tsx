import Header from "@/components/shared/header";

export default function layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div>
			<Header />
			<main className="screen "> {children}</main>
		</div>
	);
}
