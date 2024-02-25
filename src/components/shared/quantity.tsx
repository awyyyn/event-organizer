"use client";
import React from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

export default function Quantity() {
	const [quantity, setQuantity] = React.useState(1);

	const handleAdd = () => setQuantity(quantity + 1);

	const handleSubtract = () => quantity > 1 && setQuantity(quantity - 1);

	return (
		<div>
			<Label>Quantity</Label>
			<div className="flex max-w-[150px]">
				<Button
					disabled={quantity === 1}
					type="button"
					onClick={handleSubtract}
					className="rounded-none disabled:cursor-not-allowed">
					-
				</Button>
				<Input
					type="number"
					min={0}
					max={99}
					name="quantity"
					defaultValue={quantity}
					className="rounded-none text-center active:outline-none focus:outline-none outline-none  "
				/>
				<Button
					disabled={quantity === 99}
					type="button"
					onClick={handleAdd}
					className="rounded-none disabled:cursor-not-allowed">
					+
				</Button>
			</div>
		</div>
	);
}
