import { createEvent } from "@/app/actions/event.actions";
import FormSpinner from "@/components/shared/form-spinner";
import { Event } from "@prisma/client";
import React, { Suspense, lazy } from "react";
const Form = lazy(() => import("@/components/shared/form"));
const EventCarousel = lazy(() => import("@/components/shared/event-carousel"));

const origin =
	process.env.NODE_ENV === "development"
		? process.env.DEV_DOMAIN
		: process.env.PROD_DOMAIN;

async function getEvents() {
	const res = await fetch(`${origin}/api/events`, { method: "GET" });
	const events = await res.json();
	return events;
}

export default async function CreateEvent() {
	const events = await getEvents();
	console.log(events, "events", origin);
	return (
		<div className="padding-x py-28 flex-wrap   lg:flex lg:flex-row-reverse lg:justify-between w-full">
			<div className="lg:min-w-[350px] xl:w-[50%]">
				<Suspense fallback={<FormSpinner />}>
					<Form label="Create Event" />
				</Suspense>
			</div>
			<div className="max-w-[45%]   flex-nowrap   hidden lg:block lg:mr-10   ">
				<Suspense fallback={<h1>Loading...</h1>}>
					<EventCarousel events={events as Event[]} />
				</Suspense>
			</div>
		</div>
	);
}
