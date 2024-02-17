import { EventResult } from "@/lib/types/extended";
import { currentUser } from "@clerk/nextjs";
import { unstable_noStore } from "next/cache";
import { cookies } from "next/headers";
import React from "react";

const origin =
	process.env.NODE_ENV === "development"
		? process.env.DEV_DOMAIN
		: process.env.PROD_DOMAIN;

async function getEvent(eventId: string) {
	const user = await currentUser();
	const userId = user?.publicMetadata.userId as string;
	cookies().set("userId", userId);
	const result = await fetch(`${origin}/api/user-event/${eventId}`, {
		method: "GET",
	});
	const event = await result.json();
	return event as EventResult;
}

export default async function EditModal({
	params,
}: {
	params: { eventId: string };
}) {
	unstable_noStore();
	const { eventId } = params;

	const event = await getEvent(eventId);

	return (
		<div>
			<h1>Page Edit MOdal</h1>
		</div>
	);
}
