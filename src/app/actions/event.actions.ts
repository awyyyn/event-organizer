"use server";

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";
import { Event } from "@prisma/client";

export const createEvent = async (
	values: Omit<Event, "createdAt" | "updatedAt" | "eventById" | "id">
) => {
	const user = await currentUser();
	const userId = user?.publicMetadata?.userId as string;

	try {
		const event = await prisma.event.create({
			data: {
				endDate: values.endDate,
				endTime: values.endTime,
				imageUrl: values.imageUrl,
				price: values.price,
				startDate: values.startDate,
				startTime: values.startTime,
				title: values.title,
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
		console.log(error);
		// throw new Error("Something went wrong!");
	}
};

export const getEventsByUser = async () => {
	const user = await currentUser();
	const userId = user?.publicMetadata?.userId as string;
	try {
		const myEvents = await prisma.event.findMany({
			where: {
				eventById: userId,
			},
			include: {
				eventBy: true,
				category: true,
			},
		});

		return myEvents;
	} catch (error) {
		console.log(error);
	}
};
