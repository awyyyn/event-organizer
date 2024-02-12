"use client";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent } from "@/components/ui/carousel";
import { type CarouselApi } from "@/components/ui/carousel";
import { Event } from "@prisma/client";
import EventCarouselItem from "./event-carousel-item";

export default function EventCarousel({ events }: { events: Event[] }) {
	const [api, setApi] = React.useState<CarouselApi>();
	const [current, setCurrent] = React.useState(0);
	const [count, setCount] = React.useState(0);

	React.useEffect(() => {
		if (!api) {
			return;
		}
		setCount(api.scrollSnapList().length);
		setCurrent(api.selectedScrollSnap() + 1);

		api.on("select", () => {
			setCurrent(api.selectedScrollSnap() + 1);
		});
	}, [api]);

	return (
		<div className="   mr-10   ">
			<Carousel
				setApi={setApi}
				plugins={[
					Autoplay({
						delay: 10000,
					}),
				]}>
				<CarouselContent className=" ">
					{events.map((event) => (
						<EventCarouselItem key={event.id} {...event} />
					))}
				</CarouselContent>
				{/* <CarouselPrevious />
				<CarouselNext /> */}
			</Carousel>
		</div>
	);
}
