import { Event as EventType } from "@prisma/client";
import React from "react";

async function getEvents() {
	const origin =
		process.env.NODE_ENV === "development"
			? process.env.DEV_DOMAIN
			: process.env.PROD_DOMAIN;

	try {
		const res = await fetch(`${origin}/api/events`);
		const events: EventType[] = await res.json();
		return events;
	} catch (error) {
		if (error instanceof Error) console.log(error.message);
		else console.log(error);
	}
}

export default async function Event() {
	const events = await getEvents();

	console.log(events, "events");

	return (
		<div className="padding-x">
			<br />
			<br />
			<br />
			<br />
			<br />
			<h1>Event</h1>
		</div>
	);
}
