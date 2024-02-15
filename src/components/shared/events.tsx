"use client";
import { EventResult } from "@/lib/types/extended";
import { useContext, useEffect, useState } from "react";
import EventCard from "./event-card";
import { useRouter } from "next/navigation";
import { StatesContext } from "@/app/context/state";

export default function Events({ events }: { events: EventResult[] }) {
	const router = useRouter();
	const { categoryId } = useContext(StatesContext);
	const [filteredEvents, setFilteredEvents] = useState<EventResult[]>(events);

	useEffect(() => {
		if (categoryId === "*") {
			setFilteredEvents(events);
		} else {
			setFilteredEvents(events.filter((e) => e.categoryId === categoryId));
		}
	}, [categoryId]);

	return (
		<>
			{filteredEvents.length === 0 && <p>No events found</p>}
			{filteredEvents.map((event) => (
				<div onClick={() => router.push(`/event/${event.id}`)} key={event.id}>
					<EventCard key={event.id} {...event} />
				</div>
			))}
		</>
	);
}
