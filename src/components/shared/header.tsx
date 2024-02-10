import React from "react";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";

const NavSheet = () => {
	return (
		<Sheet>
			<SheetTrigger>Open</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Are you absolutely sure?</SheetTitle>
					<SheetDescription>
						This action cannot be undone. This will permanently delete your
						account and remove your data from our servers.
					</SheetDescription>
				</SheetHeader>
			</SheetContent>
		</Sheet>
	);
};

const Header = () => {
	return (
		<header className="flex px-5 py-5 justify-between shadow-md fixed top-0 w-screen z-[99] bg-white">
			<h1>Event</h1>
			<SignedIn>
				<h1>Signed In</h1>
			</SignedIn>
			<SignedOut>
				<SignInButton />
			</SignedOut>
		</header>
	);
};

export default Header;
