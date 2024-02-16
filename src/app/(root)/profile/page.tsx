import { Button } from "@/components/ui/button";
import React, { Suspense } from "react";
import EventCardSkeleton from "@/components/shared/event-card-skeleton";
import Link from "next/link";
import { getOrdersByUserId } from "@/app/actions/orders.actions";
import { currentUser } from "@clerk/nextjs";
import { getEventsByUser } from "@/app/actions/event.actions";
import MyEventCard from "@/components/shared/my-event-card";

const origin =
	process.env.NODE_ENV === "development"
		? process.env.DEV_DOMAIN
		: process.env.PROD_DOMAIN;

export default async function Profile() {
	const user = await currentUser();
	const tickets = await getOrdersByUserId();

	return (
		<div className="space-y-5 pt-5 pb-10">
			<section className="mt-tickets">
				<div className="flex justify-between">
					<h1 className="text-2xl xl:text-4xl font-bold">My Tickets</h1>
					<Link href={"/events"}>
						<Button>Explore more events</Button>
					</Link>
				</div>
				<div>
					<span>explore events</span>
				</div>
			</section>
			<section className="space-y-3">
				<div className="flex justify-between">
					<h1 className="text-2xl xl:text-4xl font-bold">Events Organized</h1>
					<Link href={"/event/create"}>
						<Button>Create new event</Button>
					</Link>
				</div>
				<Suspense fallback={<EventCardSkeleton />}>
					<EventOrganized />
				</Suspense>
			</section>
		</div>
	);
}

export async function EventOrganized() {
	const myEvents = await getEventsByUser();

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 grid-flow-dense gap-5">
			{myEvents?.map((event) => (
				<MyEventCard key={event.id} {...event} />
			))}
		</div>
	);
}
