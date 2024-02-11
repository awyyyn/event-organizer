import Form from "@/components/shared/form";
import SingleFileUpload from "@/components/shared/single-file-upload";
import React from "react";

export default function CreateEvent() {
	return (
		<div>
			<Form />
			<hr />
			<SingleFileUpload />
		</div>
	);
}
