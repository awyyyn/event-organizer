import { clerkClient } from "@clerk/nextjs";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	const req = await request.json();
	const headersStore = headers();
	const token = headersStore.get("Authorization")?.split(" ")[1] as string;
	const sid = headersStore.get("Cookie")?.split("=")[1] as string;

	const isvalid = await clerkClient.sessions.verifySession(sid, token);
	console.log(isvalid, "a");

	try {
		return NextResponse.json({ message: "HELLO WORLD" });
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(error.message);
		}
	}
}
