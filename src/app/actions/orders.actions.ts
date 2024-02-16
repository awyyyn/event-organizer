"use server";

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";

export const getOrdersByUserId = async (take?: number) => {
	const user = await currentUser();
	const userId = user?.publicMetadata.userId as string;

	try {
		const orders = await prisma.order.findMany({
			where: {
				buyerId: userId,
			},
			take,
		});
		return orders;
	} catch (error) {
		if (error instanceof Error) {
			console.log(error);
		}
	}
};

export const getOrdersByEventId = async (eventId: string, take?: number) => {
	try {
		const orders = await prisma.order.findMany({
			where: {
				eventId,
			},
			take,
		});

		return orders;
	} catch (error) {
		if (error instanceof Error) {
			console.log(error);
		}
	}
};
