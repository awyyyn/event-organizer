"use client";

import * as React from "react";
import { FaCheck } from "react-icons/fa6";

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
import { BsChevronExpand } from "react-icons/bs";
import { createCategory, getCategories } from "@/app/actions/category.actions";
import { Category } from "@prisma/client";
import { IoReload } from "react-icons/io5";

interface ComboBoxProps {
	handleBlur: () => void;
	setFieldValue: (id: string) => void;
}

export function ComboBox({ handleBlur, setFieldValue }: ComboBoxProps) {
	const [open, setOpen] = React.useState(false);
	const [isLoading, setIsLoading] = React.useState(false);
	const [value, setValue] = React.useState("");
	const [categories, setCategories] = React.useState<Category[]>();

	React.useEffect(() => {
		(() => {
			handleGetCategories();
		})();
	}, []);

	const handleGetCategories = async () => {
		setIsLoading(true);
		const categories = await getCategories();
		if (categories) {
			setCategories(categories);
		}
		setIsLoading(false);
	};

	const handleCreateCategory = async (newCategory: string) => {
		const category = (await createCategory(newCategory)) as Category;
		if (category) {
			setValue(newCategory);
			setOpen(false);
			setFieldValue(category.id);
		}
		handleGetCategories();
	};

	return (
		<div className="w-full flex  gap-x-2">
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild className="w-full">
					<Button
						onClick={handleBlur}
						variant="outline"
						role="combobox"
						aria-expanded={open}
						className=" w-full justify-between ">
						{value
							? categories?.find(
									(category) =>
										category.name.toLowerCase() === value.toLowerCase()
							  )?.name
							: "Select category..."}
						<BsChevronExpand className="ml-2 h-4 w-4 shrink-0 opacity-50" />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-full p-0">
					<Command className="w-full">
						<CommandInput
							className="w-full"
							placeholder="Search category..."
							onKeyDown={async (e) => {
								if (e.key === "Enter") {
									handleCreateCategory(e.currentTarget.value);
								}
							}}
						/>
						<CommandEmpty>
							No category found, <br />
							Enter to create new
						</CommandEmpty>
						<CommandGroup className="w-full">
							{categories &&
								categories?.map((category) => (
									<CommandItem
										key={category.id}
										value={category.name}
										onSelect={(currentValue: string) => {
											setValue(currentValue === value ? "" : currentValue);
											setOpen(false);

											setFieldValue(
												categories?.find(
													(c) =>
														c.name.toLowerCase() === currentValue.toLowerCase()
												)?.id as string
											);
										}}>
										<FaCheck
											className={cn(
												"mr-2 h-4 w-4",
												value.toLowerCase() === category.name.toLowerCase()
													? "opacity-100"
													: "opacity-0"
											)}
										/>
										{category.name}
									</CommandItem>
								))}
						</CommandGroup>
					</Command>
				</PopoverContent>
			</Popover>
			<Button size="icon" onClick={handleGetCategories} variant={"outline"}>
				<IoReload className={`${isLoading && "animate-spin"}`} />
			</Button>
		</div>
	);
}
