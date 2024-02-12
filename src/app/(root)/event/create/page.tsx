import { createEvent } from "@/app/actions/event.actions";
import { EventCarousel } from "@/components/shared/carousel";
import FormSpinner from "@/components/shared/form-spinner";
import { Event } from "@prisma/client";
import React, { Suspense, lazy } from "react";
const Form = lazy(() => import("@/components/shared/form"));

export default async function CreateEvent() {
	const handleAction = async (
		values: Partial<Omit<Event, "createdAt" | "updatedAt">>
	) => {
		"use server";
		return await createEvent(values);
	};

	return (
		<div className="padding-x py-28 lg:flex lg:flex-row-reverse lg:justify-between w-full">
			<div className="lg:min-w-[350px] xl:min-w-[450px] 2xl:min-w-[550px]">
				<Suspense fallback={<FormSpinner />}>
					<Form label="Create Event" action={handleAction} />
				</Suspense>
			</div>
			<div className="w-full lg:mr-10 xl:mr-20 2xl:mr-32">
				<EventCarousel />
			</div>
		</div>
	);
}
