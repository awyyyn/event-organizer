import React from "react";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { nav_links } from "@/lib/constant";
import Link from "next/link";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
// import { Button } from "../ui/button";

const NavSheet = () => {
	return (
		<Sheet>
			<SheetTrigger>
				{/* <Button size={"icon"}> */}
				<HiOutlineMenuAlt4 />
				{/* </Button> */}
			</SheetTrigger>
			<SheetContent className="z-[100]" side="left">
				<SheetHeader className="flex flex-col items-start py-4">
					<SheetTitle>Event</SheetTitle>
					<div className="space-y-4">
						<Nav className="block w-full text-left" />
					</div>
				</SheetHeader>
			</SheetContent>
		</Sheet>
	);
};

const Nav = ({ className }: { className?: string }) => {
	return nav_links.map(({ label, path }, indx) => (
		<Link
			key={indx}
			href={path}
			className={`${className} `}>
			{label}
		</Link>
	));
};

const Header = () => {
	return (
		<header className="flex padding-x py-5 items-center justify-between shadow-md fixed top-0 w-screen z-20 bg-white">
			<div className="flex items-center gap-x-4">
				<div className="md:hidden">
					<NavSheet />
				</div>
				<h1>Event</h1>
			</div>
			<SignedIn>
				<div className="hidden md:flex items-center gap-x-4">
					<Nav />
				</div>
				<UserButton />
			</SignedIn>
			<SignedOut>
				<SignInButton />
			</SignedOut>
		</header>
	);
};

export default Header;
