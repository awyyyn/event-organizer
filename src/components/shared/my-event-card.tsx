import { EventResult } from "@/lib/types/extended";
import Image from "next/image";
import React from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import SharedTooltip from "./shared-tooltip";
import { RiEditBoxFill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";

const tooltipProps = {
	trigger: {
		className: "rounded-sm px-3 py-1  transition-all hover:bg-black/10 ",
	},
};

export default function MyEventCard(event: EventResult) {
	const startDate = new Date(event.startDate).toDateString();
	const endDate = new Date(event.endDate).toDateString();
	const date = startDate === endDate ? startDate : `${startDate} - ${endDate}`;

	return (
		<div className="relative w-full   shadow-sm rounded-sm hover:shadow-black/20 transition-shadow   min-h-[200px] md:min-h-[200px] group hover:cursor-pointer overflow-hidden">
			<div className="relative bottom-0 w-full  min-h-[200px]   ">
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
			<div className="rounded-b-sm   p-2   w-full  items-center  ">
				<div className="flex justify-between items-center flex-wrap gap-2">
					<div className="space-x-1">
						<Badge className=" ">{event.isFree ? "Free" : "Premium"}</Badge>
						<Badge className=" ">$ {event.price}.00</Badge>
					</div>
					<div className=" space-x-1   ">
						<SharedTooltip tooltip="Edit" props={tooltipProps}>
							<RiEditBoxFill color="#03ad1d" />
						</SharedTooltip>
						<SharedTooltip tooltip="Delete" props={tooltipProps}>
							<MdDelete color="#f00" />
						</SharedTooltip>
					</div>
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
