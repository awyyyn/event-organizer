import Image from "next/image";
import React from "react";
import event from "../../../public/event-2.png";
import { Button } from "../ui/button";

const Hero = () => {
	return (
		<section className="flex flex-wrap md:flex-nowrap min-h-dvh py-20   items-center justify-center gap-y-10 md:justify-between padding-x  ">
			<div className="flex flex-col justify-between gap-y-5  w-full  md:min-w-sm md:max-w-sm xl:max-w-lg">
				<h1 className="text-3xl font-extrabold xl:text-5xl  ">
					Host, Connect, Celebrate: Elevate Your Events with Our Platform
				</h1>
				<p className="xl:text-xl">
					At [Your Event Platform], we understand that every event is a unique
					celebration, a moment to connect, and an opportunity to make lasting
					memories. Our platform is designed to empower you to host exceptional
					events effortlessly. Whether you are planning a corporate gathering, a
					milestone celebration, or a community event, we provide the tools and
					support you need.
				</p>
				<Button className="max-w-fit">Explore</Button>
			</div>
			<div className="">
				<Image src={event} height={500} width={600} alt="event" />
			</div>
		</section>
	);
};

export default Hero;
