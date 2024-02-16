import React from "react";

import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import {
	TooltipContentProps,
	TooltipTriggerProps,
} from "@radix-ui/react-tooltip";

interface SharedTooltipProps {
	children: React.ReactNode;
	tooltip: string;
	delay?: number;
	props?: {
		content?: TooltipContentProps;
		trigger?: TooltipTriggerProps;
	};
}

export default function SharedTooltip({
	children,
	tooltip,
	delay = 300,
	props,
}: SharedTooltipProps) {
	return (
		<TooltipProvider>
			<Tooltip delayDuration={delay}>
				<TooltipTrigger {...props?.trigger}>
					{children}
				</TooltipTrigger>
				<TooltipContent {...props?.content}>
					<p>{tooltip}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
