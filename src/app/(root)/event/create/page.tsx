import { createEvent } from "@/app/actions/event.actions";
import FormSpinner from "@/components/shared/form-spinner";
import { Skeleton } from "@/components/ui/skeleton";
import { Event } from "@prisma/client";
import React, { Suspense, lazy } from "react";
const Form = lazy(() => import("@/components/shared/form"));
const EventCarousel = lazy(() => import("@/components/shared/event-carousel"));

const origin =
	process.env.NODE_ENV === "development"
		? process.env.DEV_DOMAIN
		: process.env.PROD_DOMAIN;

async function getEvents() {
	const res = await fetch(`${origin}/api/events?take=5`, { method: "GET" });
	const events = await res.json();
	return events;
}

export default async function CreateEvent() {
	const events = await getEvents();
	return (
		<div className=" pt-5 pb-10 lg:gap-x-5 lg:flex lg:flex-row-reverse lg:justify-between w-full">
			<div className="lg:min-w-[350px] p-1 overflow-hidden w-full   xl:w-[50%] shrink  ">
				{/* <FormSpinner /> */}
				<Suspense fallback={<FormSpinner />}>
					<Form label="Create Event" />
				</Suspense>
			</div>
			<div className="max-w-[45%] overflow-hidden   shrink  flex-nowrap   hidden lg:block lg:mr-10   ">
				{/* <CarouselSkeleton /> */}
				<Suspense fallback={<CarouselSkeleton />}>
					<EventCarousel events={events as Event[]} />
				</Suspense>
			</div>
		</div>
	);
}

const CarouselSkeleton = () => (
	<div className="space-y-3 lg:block hidden lg:min-w-[480px] xl:min-w-[530px]  ">
		<Skeleton className="max-w-[200px] h-10" />
		<Skeleton className="  h-[500px] w-full " />
		<div className="flex gap-x-2 items-center">
			{[1, 2, 3].map((i) => (
				<Skeleton className="h-6 w-20 rounded-md" key={i} />
			))}
		</div>
		<Skeleton className="h-7 w-full " />
		<Skeleton className="h-7 w-full " />
		<Skeleton className="h-7 w-full " />
	</div>
);
