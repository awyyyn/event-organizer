import { checkout } from "@/app/actions/checkout.actions";
import EventCard from "@/components/shared/event-card";
import EventCardSkeleton from "@/components/shared/event-card-skeleton";
import Quantity from "@/components/shared/quantity";
import { Button } from "@/components/ui/button";
import { EventResult } from "@/lib/types/extended";
import { Event as EventType } from "@prisma/client";
import { unstable_noStore } from "next/cache";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense } from "react";

const origin =
	process.env.NODE_ENV === "development"
		? process.env.DEV_DOMAIN
		: process.env.PROD_DOMAIN;

async function getEvent(eventId: string) {
	const result = await fetch(`${origin}/api/event/${eventId}`, {
		method: "GET",
	});
	const event = await result.json();
	return event as EventResult;
}

export default async function Event({ params }: { params: { id: string } }) {
	unstable_noStore();
	const event = await getEvent(params.id);
	const startDate = new Date(event.startDate).toDateString();
	const endDate = new Date(event.endDate).toDateString();
	const date = startDate === endDate ? startDate : `${startDate} - ${endDate}`;

	return (
		<div className=" space-y-5 mt-5">
			<h1 className="lg:text-5xl">{event.title}</h1>
			<div className="flex flex-col lg:flex-row gap-5">
				<div className="w-full shadow-md lg:w-7/12 relative h-[300px] lg:h-[500px]   ">
					<Image
						fill
						alt={`${event.title} cover`}
						className="object-cover"
						src={event.imageUrl}
					/>
				</div>
				<div className=" space-y-2 w-full lg:w-5/12">
					<div className="flex gap-2">
						<h3>Location:</h3>
						<p className="event-data">
							{event.location ? event.location : "unknown"}
						</p>
					</div>
					<div className="flex gap-2">
						<h3>Date:</h3>
						<p className="event-data">{date}</p>
					</div>

					<div className="flex gap-2">
						<h3>Category:</h3>
						<p className="event-data">{event.category.name}</p>
					</div>

					<div className="flex gap-2">
						<h3>Type:</h3>
						<p className="event-data">
							{event.isFree ? "Free" : "Premium"} event
						</p>
					</div>

					{!event.isFree && (
						<div className="flex gap-2">
							<h3>Price:</h3>
							<p className="event-data">$ {event.price} event</p>
						</div>
					)}

					<div className="flex gap-2">
						<h3>Website/Url:</h3>
						<p className="event-data">{event.url ? event.url : "none"}</p>
					</div>

					<div className="flex gap-2">
						<h3>Time:</h3>
						<p className="event-data">
							{event.startTime} - {event.endTime}
						</p>
					</div>

					<div className="flex gap-2">
						<h3>Description:</h3>
						<p className="event-data">
							{event.description ? event.description : "none"}
						</p>
					</div>
					<form className="space-y-3" action={checkout}>
						<input type="hidden" value={event.id} name="eventId" />
						<input type="hidden" value={event.price as number} name="price" />
						<input type="hidden" value={event.title} name="event" />
						<Quantity />
						<Button type="submit">Buy Ticket</Button>
					</form>
				</div>
			</div>

			<Suspense fallback={<EventCardSkeleton />}>
				<RelatedEvents eventId={event.id} categoryId={event.categoryId} />
			</Suspense>
		</div>
	);
}

async function getRelatedEvents(id: string) {
	const result = await fetch(`${origin}/api/events?categoryId=${id}&take=9`, {
		method: "GET",
	});

	const events = await result.json();
	return events as EventResult[];
}

async function RelatedEvents({
	categoryId,
	eventId,
}: {
	eventId: string;
	categoryId: string;
}) {
	const relatedEvents = await getRelatedEvents(categoryId);
	const events = relatedEvents.filter((e) => e.id !== eventId);

	return (
		events.length > 0 && (
			<div>
				<h3>Related Events</h3>
				{events.map((evnt) => (
					<Link
						href={`/event/${evnt.id}`}
						key={evnt.id}
						className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 grid-flow-dense gap-5">
						<EventCard key={evnt.id} {...evnt} />
					</Link>
				))}
			</div>
		)
	);
}
