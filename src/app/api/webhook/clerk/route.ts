import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";
import { UserJSON, UserWebhookEvent, WebhookEvent } from "@clerk/nextjs/server";
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

	switch (event.type) {
		case "user.updated": {
			await userUpdates({ ...event.data });
		}
		case "user.created": {
			await userCreated({ ...event.data });
		}
		case "user.deleted": {
			await userDeleted(event.data.id!);
		}
		case "session.created": {
			const { public_metadata } = event.data as UserJSON;
			const id = public_metadata.userId as string;
			cookies().set("userId", id);
		}
		case "session.ended": {
			cookies().delete("userId");
		}
		default:
			return NextResponse.json("Error Occured", {
				status: 400,
				statusText: "ERR",
			});
	}
}

async function userUpdates(data: UserJSON) {
	await updateUser(data.public_metadata.userId as string, {
		email: data.email_addresses[0].email_address,
		firstname: data.first_name,
		lastname: data.last_name,
		username: data.username!,
		photo: data.image_url,
	});
}

async function userCreated(data: UserJSON) {
	const user = {
		email: data.email_addresses[0].email_address,
		firstname: data.first_name,
		lastname: data.last_name,
		photo: data.image_url,
		username: data.username!,
	};

	const newUser = await createUser(user);

	if (newUser?.id as string) {
		await clerkClient.users.updateUserMetadata(data.id, {
			publicMetadata: { userId: newUser?.id },
		});
	}
	/* set a cookie */
	cookies().set("userId", newUser?.id as string);
	return NextResponse.json(newUser, { status: 201, statusText: "OK" });
}

async function userDeleted(id: string) {
	cookies().delete("userId");
	await deleteUser(id);
	return NextResponse.json("User Deleted", { status: 200, statusText: "OK" });
}
