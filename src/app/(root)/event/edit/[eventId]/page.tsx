import { getEventData } from "@/app/actions/event.actions";
import FormSpinner from "@/components/shared/form-spinner";
import { unstable_noStore } from "next/cache";
import React, { Suspense, lazy } from "react";
const Form = lazy(() => import("@/components/shared/form"));

export default async function EditModal({
	params,
}: {
	params: { eventId: string };
}) {
	unstable_noStore();
	const { eventId } = params;
	const event = await getEventData(eventId);

	return (
		<div>
			<Suspense fallback={<FormSpinner />}>
				<Form label="Edit Event" editEvent data={event} />
			</Suspense>
		</div>
	);
}
