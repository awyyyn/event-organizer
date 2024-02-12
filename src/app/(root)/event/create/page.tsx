import { createEvent } from "@/app/actions/event.actions";
import FormSpinner from "@/components/shared/form-spinner";
import { Event } from "@prisma/client";
import React, { Suspense, lazy } from "react";
const Form = lazy(() => import("@/components/shared/form"));
const EventCarousel = lazy(() => import("@/components/shared/event-carousel"));

async function getEvents() {
	const events = await fetch("http://localhost:3000/api/events");
	return await events.json();
}

export default async function CreateEvent() {
	const events = await getEvents();
	const handleAction = async (
		values: Partial<Omit<Event, "createdAt" | "updatedAt">>
	) => {
		"use server";
		return await createEvent(values);
	};

	return (
		<div className="padding-x py-28 flex-wrap   lg:flex lg:flex-row-reverse lg:justify-between w-full">
			<div className="lg:min-w-[350px] xl:min-w-[450px] 2xl:min-w-[550px]">
				<Suspense fallback={<FormSpinner />}>
					<Form label="Create Event" action={handleAction} />
				</Suspense>
			</div>
			<div className="max-w-[50%]  	 hidden lg:block lg:mr-10   ">
				<Suspense fallback={<h1>Loading...</h1>}>
					<EventCarousel events={events} />
				</Suspense>
			</div>
		</div>
	);
}
