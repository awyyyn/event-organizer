import Image from "next/image";
import React from "react";
import event from "../../../public/event-2.png";
import { Button } from "../ui/button";

const Hero = () => {
	return (
		<section className="flex flex-wrap min-h-dvh items-center justify-center p-5 xs:p-10 gap-y-10 md:gap-x-10 lg:gap-x-8 xl:gap-x-16 2xl:gap-x-48 ">
			<div className="flex flex-col justify-between gap-y-5 sm:max-w-lg">
				<h1 className="text-3xl font-extrabold">
					Host, Connect, Celebrate: Elevate Your Events with Our Platform
				</h1>
				<p>
					At [Your Event Platform], we understand that every event is a unique
					celebration, a moment to connect, and an opportunity to make lasting
					memories. Our platform is designed to empower you to host exceptional
					events effortlessly. Whether you are planning a corporate gathering, a
					milestone celebration, or a community event, we provide the tools and
					support you need.
				</p>
				<Button className="max-w-fit">Explore</Button>
			</div>
			<div className="sm:p-10">
				<Image src={event} height={500} width={600} alt="event" />
			</div>
		</section>
	);
};

export default Hero;
