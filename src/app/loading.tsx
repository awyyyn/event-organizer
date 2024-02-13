import React from "react";
import { AiOutlineLoading } from "react-icons/ai";

export default function Loading() {
	return (
		<div className="h-dvh w-screen grid place-content-center">
			<div className="flex gap-x-1">
				<AiOutlineLoading className="animate-spin" />
				<span>loading...</span>
			</div>
		</div>
	);
}
