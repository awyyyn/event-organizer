"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function CloseButton() {
	const router = useRouter();

	return (
		<Button
			className="w-full bg-secondary hover:bg-stone-300    text-foreground mt-2"
			onClick={() => {
				router.back();
			}}>
			Cancel
		</Button>
	);
}
