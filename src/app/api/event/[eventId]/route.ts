import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
	req: Request,
	{ params }: { params: { eventId: string } }
) {
	const { eventId } = params;

	try {
		if (eventId === null) {
			// return NextResponse.json({ message: "Event ID is missing!" });
			throw new Error("Event ID is missing!");
		}

		const event = await prisma.event.findUnique({
			where: { id: eventId },
			include: {
				orders: true,
				_count: true,
				category: true,
				eventBy: true,
			},
		});

		if (event === null) {
			// return NextResponse.json({ message: "Event not found!" });
			throw new Error("Event not found!");
		}

		return NextResponse.json(event, { status: 200, statusText: "OK" });
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(error.message);
		}
	}
}
