import Image from "next/image";
import { Badge } from "../ui/badge";
import { EventResult } from "@/lib/types/extended";

export default function EventCard(event: EventResult) {
	return (
		<div className="relative w-full   shadow-sm  hover:shadow-md min-h-[250px] md:min-h-[200px] group hover:cursor-pointer overflow-hidden">
			<Badge className="absolute top-2 left-2 z-10">
				{event.isFree ? "Free" : "Premium"}
			</Badge>
			<div className="relative bottom-0 w-full min-h-[250px] md:min-h-[200px] ">
				<Image
					fill
					alt={event.title}
					className="group-hover:scale-125 transition-all"
					src={event.imageUrl}
				/>
			</div>
			<div className="  group-hover:transition-all transition-all group-hover:block absolute  bg-black/45 group-hover:-translate-y-full p-2  left-0 w-full  backdrop-blur-lg ">
				<h1 className="text-white text-2xl font-bold">{event.title}</h1>
				<h2 className="text-white">- {event.eventBy.username}</h2>
			</div>
		</div>
	);
}
