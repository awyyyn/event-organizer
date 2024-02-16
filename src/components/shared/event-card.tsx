import Image from "next/image";
import { Badge } from "../ui/badge";
import { EventResult } from "@/lib/types/extended";
import SharedTooltip from "./shared-tooltip";
export default function EventCard(event: EventResult) {
	const startDate = new Date(event.startDate).toDateString();
	const endDate = new Date(event.endDate).toDateString();
	const date = startDate === endDate ? startDate : `${startDate} - ${endDate}`;

	return (
		<SharedTooltip
			props={{
				trigger: {
					asChild: true,
				},
				content: {
					side: "bottom",
				},
			}}
			tooltip="Click for more details">
			<div className="relative w-full   shadow-lg rounded-sm  hover:shadow-md min-h-[250px] md:min-h-[200px] group hover:cursor-pointer overflow-hidden">
				<Badge className="absolute top-2 left-2 z-10">
					{event.isFree ? "Free" : "Premium"}
				</Badge>
				<div className="relative bottom-0 w-full  min-h-[250px] md:min-h-[250px] ">
					<Image
						fill
						placeholder="blur"
						blurDataURL="/blurdata.png"
						alt={event.title}
						sizes="100vw"
						className="group-hover:scale-125 transition-all object-cover"
						src={event.imageUrl}
					/>
				</div>
				<div className="  group-hover:transition-all  rounded-b-sm transition-all group-hover:block absolute  bg-black/65 group-hover:-translate-y-full p-2  left-0 w-full  backdrop-blur-lg ">
					<h2 className="text-white text-xs text-right">{date}</h2>
					<h2 className="text-white text-xs text-right">
						{event.startTime} - {event.endTime}
					</h2>
					<h1 className="text-white text-2xl font-bold">{event.title}</h1>
					<h2 className="text-white">- {event.eventBy.username}</h2>
				</div>
			</div>
		</SharedTooltip>
	);
}
