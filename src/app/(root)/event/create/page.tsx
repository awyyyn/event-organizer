import { createEvent } from "@/app/actions/event.actions";
import FormSpinner from "@/components/shared/form-spinner";
import { auth, currentUser } from "@clerk/nextjs";
import { Event } from "@prisma/client";
import React, { Suspense, lazy } from "react";
import { metadata } from "../../../layout";
const Form = lazy(() => import("@/components/shared/form"));
const EventCarousel = lazy(() => import("@/components/shared/event-carousel"));

async function getEvents() {
	const origin =
		process.env.NODE_ENV === "development"
			? process.env.DEV_DOMAIN
			: process.env.PROD_DOMAIN;
	const res = await fetch(`${origin}/api/events`);
	const events: Event[] = await res.json();
	return events;
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
			<div className="lg:min-w-[350px] xl:w-[50%]">
				<Suspense fallback={<FormSpinner />}>
					<Form label="Create Event" action={handleAction} />
				</Suspense>
			</div>
			<div className="max-w-[45%]  bg-red-400 flex-nowrap xl:bg-yellow-500 hidden lg:block lg:mr-10   ">
				<Suspense fallback={<h1>Loading...</h1>}>
					<EventCarousel events={events} />
				</Suspense>
			</div>
		</div>
	);
}
