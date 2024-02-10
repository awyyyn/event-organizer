"use server";

import prisma from "@/lib/prisma";
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
		throw new Error("Internal Error");
	}
}
