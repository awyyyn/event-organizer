import { EventResult } from "@/lib/types/extended";
import Image from "next/image";
import React from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

export default function MyEventCard(event: EventResult) {
	const startDate = new Date(event.startDate).toDateString();
	const endDate = new Date(event.endDate).toDateString();
	const date = startDate === endDate ? startDate : `${startDate} - ${endDate}`;

	return (
		<div className="relative w-full   shadow-sm rounded-sm hover:shadow-black/20 transition-shadow   min-h-[200px] md:min-h-[200px] group hover:cursor-pointer overflow-hidden">
			<div className="relative bottom-0 w-full  min-h-[200px]   ">
				<div className="absolute top-2 right-2">
					<Button>Edit</Button>
				</div>
				<Image
					fill
					placeholder="blur"
					blurDataURL="/blurdata.png"
					alt={event.title}
					sizes="100vw"
					className="  object-cover"
					src={event.imageUrl}
				/>
			</div>
			<div className="rounded-b-sm   p-2   w-full   ">
				<div className="flex flex-wrap gap-2">
					<Badge className=" ">{event.isFree ? "Free" : "Premium"}</Badge>
					<Badge className=" ">$ {event.price}.00</Badge>
				</div>
				<h1 className=" text-2xl font-bold">{event.title}</h1>
				<h2 className="text-sm">{date}</h2>
				<h2 className="text-sm">
					{event.startTime} - {event.endTime}
				</h2>
			</div>
		</div>
	);
}
