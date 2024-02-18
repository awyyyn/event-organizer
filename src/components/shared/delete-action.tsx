"use client";
import { deleteEventByUser } from "@/app/actions/event.actions";
import { AlertDialogAction } from "@radix-ui/react-alert-dialog";
import React from "react";
import { useToast } from "../ui/use-toast";

export default function DialogAction({ id }: { id: string }) {
	const { toast } = useToast();

	return (
		<AlertDialogAction
			className="bg-destructive text-destructive-foreground px-4 rounded-md"
			onClick={async () => {
				toast({
					className: "",
					title: "Deleting in progress...",
					duration: 60000,
				});

				const isDeleted = await deleteEventByUser(id);

				if (!isDeleted) {
					return toast({
						variant: "destructive",
						title: "Error",
						description: "Something went wrong",
					});
				}
				toast({
					className: "bg-green-500 text-white",
					title: "Deleted successfully",
				});
			}}>
			Confirm
		</AlertDialogAction>
	);
}
