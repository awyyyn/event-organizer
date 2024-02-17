import React, { Suspense, lazy } from "react";
import { CloseButton } from "./close";
import FormSpinner from "@/components/shared/form-spinner";
import { ScrollArea } from "@/components/ui/scroll-area";
import { EventResult } from "@/lib/types/extended";
const Form = lazy(() => import("@/components/shared/form"));

const origin =
	process.env.NODE_ENV === "development"
		? process.env.DEV_DOMAIN
		: process.env.PROD_DOMAIN;

async function getEventById(id: string) {
	const result = await fetch(`${origin}/api/event/${id}`, {
		method: "GET",
	});
	const event = await result.json();
	return event as EventResult;
}

export default async function Page({
	params,
}: {
	params: { eventId: string };
}) {
	const { eventId } = params;
	const event = await getEventById(eventId);

	return (
		<div className="h-screen w-screen grid place-content-center absolute top-0 left-0 z-20 backdrop-blur-md">
			<ScrollArea className="max-h-[80dvh]   bg-white  lg:min-w-[80dvh] p-5 shadow-lg rounded-md relative">
				<Suspense fallback={<FormSpinner />}>
					<Form label="Edit Event" editEvent data={event} />
				</Suspense>
				<CloseButton />
			</ScrollArea>
		</div>
	);
}
