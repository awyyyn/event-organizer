import Header from "@/components/shared/header";

export default function layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div>
			<Header />
			<main className="padding-x pt-20">{children}</main>
		</div>
	);
}
