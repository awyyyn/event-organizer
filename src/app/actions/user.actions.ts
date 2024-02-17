"use server";

import prisma from "@/lib/prisma";
import { EventResult } from "@/lib/types/extended";
import { auth, currentUser } from "@clerk/nextjs";
import type { User } from "@prisma/client";

export async function createUser(
	user: Omit<User, "id" | "createdAt" | "updatedAt">
) {
	const { email, firstname, lastname, photo, username } = user;
	try {
		const createdUser = await prisma.user.create({
			data: {
				email,
				firstname,
				lastname,
				photo,
				username,
			},
		});

		return createdUser;
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(error.message);
		}
	}
}

export async function deleteUser(id: string) {
	try {
		await prisma.user.delete({
			where: {
				id,
			},
		});
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(error.message);
		}
	}
}

export async function updateUser(
	id: string,
	user: Omit<User, "id" | "createdAt" | "updatedAt">
) {
	const { email, firstname, lastname, photo, username } = user;
	try {
		const updatedUser = await prisma.user.update({
			data: {
				email,
				firstname,
				lastname,
				photo,
				username,
			},
			where: {
				id,
			},
		});

		return updateUser;
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(error.message);
		}
	}
}

export async function getMyEvents() {
	const user = await currentUser();
	const userId = user?.publicMetadata.userId as string;

	const result = await prisma.user.findUnique({
		include: {
			events: true,
		},
		where: {
			id: userId,
		},
	});

	const events = result?.events as EventResult[];
	return events;
}
