"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useFormik } from "formik";
import { array, boolean, date, number, object, string } from "yup";

import React from "react";
import DatePicker from "@/components/shared/date-picker";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";

const validateSchema = object().shape({
	title: string().required("Title is required"),
	description: string().notRequired(),
	category: array().of(string()).required("Select at least 1 category"),
	isFree: boolean().required("Select if event is free").default(false),
	price: number().when("isFree", {
		is: false,
		then: (schema) => schema.required("Price is required").min(1),
		otherwise: (schema) => schema.notRequired(),
	}),
	date: date().required("Date is required").default(new Date()),
});

export default function CreateEvent() {
	const { values, handleChange, handleSubmit, setFieldValue, errors } =
		useFormik({
			initialValues: {
				description: "",
				category: ["as"],
				title: "",
				isFree: false,
				price: 0,
				date: new Date(),
			},

			onSubmit: (values) => {
				console.log(values);
			},
			validationSchema: validateSchema,
		});

	return (
		<section className="padding-x py-20">
			<form onSubmit={handleSubmit}>
				<h1 className="lg:text-4xl font-bold">Create Event</h1>
				<div className="flex">
					<div className="space-y-4">
						<div>
							<Label htmlFor="title">Title</Label>
							<Input
								type="title"
								value={values.title}
								onChange={handleChange}
								id="title"
								name="title"
								placeholder="title"
							/>
						</div>
						<div className="flex items-center space-x-2 justify-evenly">
							<Label
								htmlFor="isFree"
								className={`${
									!values.isFree ? "text-stone-950" : "text-stone-600"
								}`}>
								Paid Event?
							</Label>
							<Switch
								id="isFree"
								name="isFree"
								checked={values.isFree}
								onClick={(e) => console.log(e.currentTarget.value)}
								// onChange={(e) => (
								// 	setFieldValue("isFree", e.currentTarget.value),
								// 	console.log(e.currentTarget.value, "va")
								// )}
								onCheckedChange={(e) => setFieldValue("isFree", e)}
							/>

							<Label
								htmlFor="isFree"
								className={`${
									values.isFree ? "text-stone-950" : "text-stone-600"
								}`}>
								Free Event?
							</Label>
						</div>
						<div>
							<Label htmlFor="price">Price</Label>
							<Input
								type="price"
								value={values.price}
								onChange={handleChange}
								id="price"
								name="price"
								placeholder="price"
							/>
						</div>
						<div>
							<Label htmlFor="description">Description</Label>
							<Textarea
								name="description"
								id="description"
								rows={5}
								onChange={handleChange}
								value={values.description}
								placeholder="Reprehenderit elit commodo elit ut esse consectetur non non consequat anim deserunt anim aliquip sint."
							/>
						</div>
						<div>
							<Label className="block" htmlFor="date">
								Date
							</Label>
							<DatePicker date={values.date} handleChange={setFieldValue} />
						</div>
						<Button type="submit">Create Event</Button>
					</div>
				</div>
			</form>
		</section>
	);
}
