"use server";

import prisma from "@/lib/prisma";
import { Category } from "@prisma/client";

export const getCategories = async () => {
	try {
		const categories = await prisma.category.findMany();

		return categories;
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(error.message);
		}
	}
};

export const createCategory = async (name: string) => {
	try {
		const category = await prisma.category.create({
			data: {
				name,
			},
		});

		return category;
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(error.message);
		}
	}
};
