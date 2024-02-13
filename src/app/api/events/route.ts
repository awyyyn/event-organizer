import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const events = await prisma.event.findMany({
			include: {
				category: true,
			},
			take: 5,
		});
		return NextResponse.json(events, { status: 200, statusText: "OK" });
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(error.message);
		}
	}
}
