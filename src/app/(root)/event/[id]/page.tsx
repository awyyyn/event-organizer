import { Button } from "@/components/ui/button";
import { EventResult } from "@/lib/types/extended";
import { Event as EventType } from "@prisma/client";
import Image from "next/image";
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

	return event as EventResult;
}

export default async function Event({ params }: { params: { id: string } }) {
	const event = await getEvent(params.id);

	const startDate = new Date(event.startDate).toDateString();
	const endDate = new Date(event.endDate).toDateString();
	const date = startDate === endDate ? startDate : `${startDate} - ${endDate}`;

	return (
		<div className="padding-x space-y-5 mt-5">
			<h1 className="lg:text-5xl">{event.title}</h1>
			<div className="flex flex-col lg:flex-row gap-5">
				<div className="w-full shadow-md lg:w-8/12 relative h-[300px] lg:h-[500px]   ">
					<Image
						fill
						alt={`${event.title} cover`}
						className="object-cover"
						src={event.imageUrl}
					/>
				</div>
				<div className=" space-y-2 w-full lg:w-4/12">
					<div className="flex gap-2">
						<h3>Location</h3>
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

					<Button>Buy ticket</Button>
				</div>
			</div>
			<div>
				<h3>Description:</h3>
				<p className="event-data">
					{event.description ? event.description : "none"}
				</p>
			</div>
		</div>
	);
}
