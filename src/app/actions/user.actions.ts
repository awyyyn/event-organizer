"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
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

export async function getAuth() {
	const { userId } = auth();

	return userId;
}
