import * as React from "react";

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";

interface SelectTimeProps {
	handleBlur: () => void;
	handleChange: (value: string) => void;
	label?: "start" | "end";
}

export function SelectTime({
	handleBlur,
	handleChange,
	label = "start",
}: SelectTimeProps) {
	const [time, setTime] = React.useState({
		time: label === "start" ? "08:00" : "05:00",
		amORpm: label === "start" ? "am" : "pm",
	});

	React.useEffect(() => {
		handleChange(`${time.time} ${time.amORpm}`);
	}, [time]);

	return (
		<div className="flex space-x-3">
			<Select
				value={time.time}
				onValueChange={(v) => setTime((t) => ({ ...t, time: v }))}>
				<SelectTrigger className="w-full" onClick={handleBlur}>
					<SelectValue placeholder={`Select ${label} time`} />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						<SelectLabel>Select {label} time </SelectLabel>
						<SelectItem value="01:00">01:00</SelectItem>
						<SelectItem value="02:00">02:00</SelectItem>
						<SelectItem value="03:00">03:00</SelectItem>
						<SelectItem value="04:00">04:00</SelectItem>
						<SelectItem value="05:00">05:00</SelectItem>
						<SelectItem value="06:00">06:00</SelectItem>
						<SelectItem value="07:00">07:00</SelectItem>
						<SelectItem value="08:00">08:00</SelectItem>
						<SelectItem value="09:00">09:00</SelectItem>
						<SelectItem value="10:00">10:00</SelectItem>
						<SelectItem value="11:00">11:00</SelectItem>
						<SelectItem value="12:00">12:00</SelectItem>
					</SelectGroup>
				</SelectContent>
			</Select>
			<ToggleGroup
				type="single"
				value={time.amORpm}
				onValueChange={(v) => setTime((t) => ({ ...t, amORpm: v }))}>
				<ToggleGroupItem value="am">AM</ToggleGroupItem>
				<ToggleGroupItem value="pm">PM</ToggleGroupItem>
			</ToggleGroup>
		</div>
	);
}
