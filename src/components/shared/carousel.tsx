"use client";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { type CarouselApi } from "@/components/ui/carousel";

export function EventCarousel() {
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
		<div className="w-full border-2 border-red-500 mr-10">
			<Carousel
				setApi={setApi}
				className="w-full "
				plugins={[
					Autoplay({
						delay: 10000,
					}),
				]}>
				<CarouselContent>
					<CarouselItem>..1.</CarouselItem>
					<CarouselItem>..2.</CarouselItem>
					<CarouselItem>..3.</CarouselItem>
				</CarouselContent>
				{/* <CarouselPrevious />
				<CarouselNext /> */}
			</Carousel>
		</div>
	);
}
