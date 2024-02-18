"use server";

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";
import { Event } from "@prisma/client";
import { revalidatePath } from "next/cache";

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

export async function getEventData(id: string) {
	const user = await currentUser();
	const userId = user?.publicMetadata.userId as string;
	const event = await prisma.event.findFirst({
		where: {
			id,
			eventById: userId,
		},
		include: {
			category: true,
			eventBy: true,
		},
	});

	if (event === null) {
		return null;
	}

	return event;
}

export const updateEvent = async (
	values: Omit<Event, "createdAt" | "updatedAt">
) => {
	const updateEvent = await prisma.event.update({
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
		},
		where: {
			id: values.id,
			eventById: values.eventById,
		},
	});

	if (updateEvent === null) {
		throw new Error("Error 500");
	}
	revalidatePath("/profile");
	return updateEvent;
};

export const deleteEventByUser = async (eventId: string) => {
	const user = await currentUser();
	const userId = user?.publicMetadata.userId as string;

	const event = await prisma.event.delete({
		where: {
			id: eventId,
			eventById: userId,
		},
	});

	if (event === null) {
		return false;
	}
	revalidatePath("/profile");
	return true;
};
