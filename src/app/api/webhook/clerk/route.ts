import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { WebhookEvent } from "@clerk/nextjs/server";
import { Webhook } from "svix";
// import { User } from "@prisma/client";
import { createUser, deleteUser, updateUser } from "@/app/actions/user.actions";
import { clerkClient } from "@clerk/nextjs";
// import { clerkClient } from "@clerk/nextjs";
// import {  } from "next/server"

export async function POST(req: Request) {
	const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET ?? "";
	if (!WEBHOOK_SECRET) {
		throw new Error("WEBHOOK_SECRET is not set");
	}

	const headersPayload = headers();
	const svix_id = headersPayload.get("svix-id");
	const svix_timestamp = headersPayload.get("svix-timestamp");
	const svix_signature = headersPayload.get("svix-signature");

	// If there are no headers, error out
	if (!svix_id || !svix_timestamp || !svix_signature) {
		return new Response("Error occured -- no svix headers", {
			status: 400,
		});
	}

	const payload = await req.json();
	const body = JSON.stringify(payload);

	// Create a new Svix instance with your secret.
	const wh = new Webhook(WEBHOOK_SECRET);

	let event: WebhookEvent;

	try {
		event = wh.verify(body, {
			"svix-id": svix_id,
			"svix-timestamp": svix_timestamp,
			"svix-signature": svix_signature,
		}) as WebhookEvent;
	} catch (error) {
		return NextResponse.json(
			{ message: "Error Occured" },
			{ status: 400, statusText: "Error Occured" }
		);
	}

	// Get the ID and type
	const { id } = event.data;
	const eventType = event.type;

	console.log(`Webhook with and ID of ${id} and type of ${eventType}`);
	console.log("Webhook body:", body);
	// return NextResponse.json({ message: "Webhook received" }, { status: 200 });

	if (event.type === "user.created") {
		const data = event.data;

		const user = {
			email: data.email_addresses[0].email_address,
			firstname: data.first_name,
			lastname: data.last_name,
			photo: data.image_url,
			username: data.username!,
		};

		const newUser = await createUser(user);
		if (newUser?.id as string) {
			await clerkClient.users.updateUserMetadata(newUser?.id!, {
				publicMetadata: { userId: newUser?.id },
			});
		}
		console.log(newUser);
		return NextResponse.json(newUser, { status: 201, statusText: "OK" });
	}

	if (event.type === "user.deleted") {
		await deleteUser(event.data.id as string);
		return NextResponse.json("User Deleted", { status: 200, statusText: "OK" });
	}

	if (event.type === "user.updated") {
		const {
			email_addresses,
			first_name,
			last_name,
			image_url,
			username,
			public_metadata,
		} = event.data;

		await updateUser(public_metadata.userId as string, {
			email: email_addresses[0].email_address,
			firstname: first_name,
			lastname: last_name,
			username: username!,
			photo: image_url,
		});
	}
	return NextResponse.json("Error Occured", { status: 400, statusText: "ERR" });
}
