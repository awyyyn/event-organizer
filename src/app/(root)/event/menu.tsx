"use client";
import { Category } from "@prisma/client";
import React, { useContext } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { LuChevronsUpDown, LuCheck } from "react-icons/lu";
import { StatesContext } from "@/app/context/state";

export default function CategoryFilter({
	categories,
}: {
	categories: Category[];
}) {
	const { handleCategoryId } = useContext(StatesContext);
	const [open, setOpen] = React.useState(false);

	const [value, setValue] = React.useState("*");
	const handleSelect = (v: string) => {
		setValue(v);
		handleCategoryId(v);
		setOpen(false);
	};

	return (
		<div className="flex gap-3 flex-wrap">
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						role="combobox"
						aria-expanded={open}
						className="w-[200px] justify-between capitalize">
						{value === "*"
							? "All"
							: categories.find((category) => category.id === value)?.name}
						<LuChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-[200px] p-0">
					<Command>
						<CommandInput placeholder="Search framework..." />
						<CommandEmpty>No category found.</CommandEmpty>
						<CommandGroup>
							<CommandItem value="*" onSelect={handleSelect}>
								<LuCheck
									className={cn(
										"mr-2 h-4 w-4",
										value === "*" ? "opacity-100" : "opacity-0"
									)}
								/>
								All
							</CommandItem>
							{categories.map((category) => (
								<CommandItem
									key={category.id}
									value={category.id}
									onSelect={handleSelect}>
									<LuCheck
										className={cn(
											"mr-2 h-4 w-4 capitalize",
											value === category.id ? "opacity-100" : "opacity-0"
										)}
									/>
									{category.name}
								</CommandItem>
							))}
						</CommandGroup>
					</Command>
				</PopoverContent>
			</Popover>
		</div>
	);
}
