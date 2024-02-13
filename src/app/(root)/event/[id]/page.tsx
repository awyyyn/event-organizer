import { Event as EventType } from "@prisma/client";
import React from "react";

const origin =
	process.env.NODE_ENV === "development"
		? process.env.DEV_DOMAIN
		: process.env.PROD_DOMAIN;

async function getEvent(eventId: string) {
	const result = await fetch(`${origin}/api/event/${eventId}`, {
		method: "GET",
	});

	const event = await result.json();

	return event;
}

export default async function Event({ params }: { params: { id: string } }) {
	const event = await getEvent(params.id);
	console.log(event, "/event/[id]");
	return (
		<div className="padding-x">
			<h1>Hello World</h1>
		</div>
	);
}
