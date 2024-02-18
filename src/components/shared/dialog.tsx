import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import React from "react";
import DialogAction from "./delete-action";
import { MdDelete } from "react-icons/md";

export default function DeleteDialog({ id }: { id: string }) {
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<button className="rounded-sm px-3 py-1  transition-all hover:bg-black/10">
					<MdDelete color="#f00" />
				</button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Delete Event</AlertDialogTitle>
					<AlertDialogDescription>
						Please confirm if you want to delete this event
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter className="space-x-2">
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<DialogAction id={id} />
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
