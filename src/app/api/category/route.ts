import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		const body = await req.json();

		const category = await prisma.category.create({
			data: {
				name: body.name,
			},
		});

		return NextResponse.json(category, { status: 201, statusText: "OK" });
	} catch (error) {
		if (error instanceof Error) {
			return NextResponse.json(error);
		}
	}
}
