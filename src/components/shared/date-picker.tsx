import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CiCalendarDate } from "react-icons/ci";

import { cn } from "@/lib/utils";
import { DateRange } from "react-day-picker";

interface DatePickerProps {
	handleChange: any;
}

function DatePicker({ handleChange }: DatePickerProps) {
	const [date, setDate] = React.useState<DateRange | undefined>({
		from: /* new Date() */ undefined,
		to: /* new Date() */ undefined,
	});

	useEffect(() => {
		handleChange("startDate", date?.from?.toISOString());
		handleChange("endDate", date?.to?.toISOString());
	}, [date]);

	return (
		<>
			<Popover>
				<PopoverTrigger asChild>
					<Button
						variant={"outline"}
						className={cn(
							"space-x-4  justify-start text-left font-normal w-full",
							!date && "text-muted-foreground"
						)}>
						<CiCalendarDate className="mr-2 h-4 w-4" />
						{date?.from ? (
							date.to ? (
								<>
									{format(date.from, "LLL dd, y")} -{" "}
									{format(date.to, "LLL dd, y")}
								</>
							) : (
								format(date.from, "LLL dd, y")
							)
						) : (
							<span>Pick a date</span>
						)}
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-auto p-0" align="start">
					<Calendar
						mode="range"
						selected={date}
						onSelect={setDate}
						initialFocus
						disabled={(date) => date < new Date()}
					/>
				</PopoverContent>
			</Popover>
		</>
	);
}

export default DatePicker;
