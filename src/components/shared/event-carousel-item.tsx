import React from "react";
import { CarouselItem } from "../ui/carousel";
import { Event } from "@prisma/client";
import Image from "next/image";
import { CiLocationOn } from "react-icons/ci";
import { Badge } from "../ui/badge";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
export default function EventCarouselItem({
	title,
	description,
	imageUrl,
	isFree,
	location,
	price,
	startDate,
	endDate,
	startTime,
	endTime,
}: Event) {
	return (
		<CarouselItem className="space-y-2  ">
			<h1 className="text-3xl font-bold">{title}</h1>
			{/* <div className="relative w-[400px] h-[400px] xl:h-[500px]"> */}
			<Image
				src={imageUrl}
				alt={title}
				height={300}
				width={500}
				className="object-cover   "
				placeholder="blur"
				blurDataURL="/blurdata.png"
				loading="lazy"
			/>
			{/* </div> */}

			<div className="flex gap-x-2 items-center flex-wrap">
				<Badge variant={"outline"} className="space-x-1">
					{isFree ? "Free Event" : "Paid Event"}
				</Badge>
				<Badge variant={"outline"} className="space-x-1">
					<CiLocationOn />
					<span>{location ? location : "unknown"}</span>
				</Badge>
				{price && (
					<Badge variant={"outline"} className="space-x-1">
						<RiMoneyDollarCircleFill />
						{price}
					</Badge>
				)}
			</div>
			<div className="flex justify-evenly gap-2 flex-wrap ">
				{/* <p>Start Date: {new Date(startDate).toDateString()}</p>
				<p>End Date: {new Date(endDate).toDateString()}</p>
				<p>Start Time: {startTime.toUpperCase()}</p>
				<p>End Time: {endTime.toUpperCase()}</p> */}
			</div>
			<p>{description}</p>
		</CarouselItem>
	);
}
