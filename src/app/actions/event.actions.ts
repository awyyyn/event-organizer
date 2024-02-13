"use server";

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";
import { Event } from "@prisma/client";

export const createEvent = async (
	values: Partial<Omit<Event, "createdAt" | "updatedAt">>
) => {
	const user = await currentUser();
	const userId = user?.publicMetadata?.userId as string;

	try {
		const event = await prisma.event.create({
			data: {
				endDate: values.endDate
					? values.endDate.toISOString()
					: new Date().toISOString(),
				endTime: values?.endTime as string,
				imageUrl: values.imageUrl as string,
				price: values.price as number,
				startDate: values?.startDate?.toISOString() as string,
				startTime: values.startTime as string,
				title: values.title as string,
				url: values.url,
				location: values.location,
				description: values.description,
				isFree: values.isFree,
				category: {
					connect: {
						id: values.categoryId,
					},
				},
				eventBy: {
					connect: {
						id: userId,
					},
				},
			},
		});
		return event;
	} catch (error) {
		throw new Error("Something went wrong!");
	}
};
