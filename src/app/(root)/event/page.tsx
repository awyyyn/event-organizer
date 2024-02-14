import EventCard from "@/components/shared/event-card";
import { EventResult } from "@/lib/types/extended";
import Link from "next/link";

import React from "react";

async function getEvents() {
	const origin =
		process.env.NODE_ENV === "development"
			? process.env.DEV_DOMAIN
			: process.env.PROD_DOMAIN;

	const res = await fetch(`${origin}/api/events?take=5`, { method: "GET" });
	const events: EventResult[] = await res.json();

	return events;
}

export default async function Event() {
	const events = await getEvents();

	return (
		<div className="padding-x">
			<h1>Event</h1>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 grid-flow-dense gap-5">
				{events.map((event) => (
					<Link href={`/event/${event.id}`} key={event.id}>
						<EventCard key={event.id} {...event} />
					</Link>
				))}
			</div>
		</div>
	);
}
