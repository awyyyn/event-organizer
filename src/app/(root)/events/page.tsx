import Events from "@/components/shared/events";
import { EventResult } from "@/lib/types/extended";
import React, { Suspense, lazy } from "react";
import { getCategories } from "@/app/actions/category.actions";
import { Category } from "@prisma/client";
import { Skeleton } from "@/components/ui/skeleton";

const CategoryFilter = lazy(() => import("./menu"));

const origin =
	process.env.NODE_ENV === "development"
		? process.env.DEV_DOMAIN
		: process.env.PROD_DOMAIN;

async function getEvents() {
	const res = await fetch(`${origin}/api/events?take=5`, { method: "GET" });
	const events: EventResult[] = await res.json();

	return events;
}

export default async function Event() {
	const events = await getEvents();
	const categories = await getCategories();

	return (
		<div className=" pt-5 pb-10 space-y-5">
			<h1 className="text-3xl">Events</h1>
			<div className="flex gap-x-2 items-center ">
				<h2 className="text-xl">Filter by category</h2>
				<Suspense fallback={<Skeleton className="h-9 w-[200px]" />}>
					<CategoryFilter categories={categories as Category[]} />
				</Suspense>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 grid-flow-dense gap-5">
				<Events events={events} />
			</div>
		</div>
	);
}
