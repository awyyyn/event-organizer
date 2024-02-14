import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	const url = req.nextUrl;
	const take = url.searchParams.get("take");
	console.log(Number(take) ?? undefined);
	try {
		const events = await prisma.event.findMany({
			include: {
				category: true,
				eventBy: true,
			},
			take: Number(take) === 0 ? undefined : Number(take),
		}); 
		return NextResponse.json(events, { status: 200, statusText: "OK" });
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(error.message);
		}
	}
}
