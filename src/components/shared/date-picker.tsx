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

interface DatePickerProps {
	handleChange: any;
	handleBlur: any;
}

function DatePicker({ handleChange, handleBlur }: DatePickerProps) {
	const [date, setDate] = React.useState<Date>();

	useEffect(() => {
		handleChange("date", date?.toISOString()) as Date;
	}, [date]);

	return (
		<>
			<Popover>
				<PopoverTrigger asChild>
					<Button
						onBlur={handleBlur}
						variant={"outline"}
						className={cn(
							"space-x-4  justify-start text-left font-normal w-full",
							!date && "text-muted-foreground"
						)}>
						<CiCalendarDate className="mr-2 h-4 w-4" />
						{date ? format(date, "PPP") : <span>Pick a date</span>}
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-auto p-0" align="start">
					<Calendar
						mode="single"
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
