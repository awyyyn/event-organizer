export default function layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <main className="grid place-content-center screen  ">{children}</main>;
}
