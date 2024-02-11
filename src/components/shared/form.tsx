"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useFormik } from "formik";
import { boolean, date, number, object, string } from "yup";

import React, { useEffect } from "react";
import DatePicker from "@/components/shared/date-picker";
import { Switch } from "@/components/ui/switch";
import SingleFileUpload from "./single-file-upload";
import { Event } from "@prisma/client";
import { ComboBox } from "./combobox";

const validateSchema = object().shape({
	title: string().required("Title is required"),
	description: string().notRequired(),
	category: string().required("Category is required"),
	isFree: boolean().required("Select if event is free").default(false),
	price: number().when("isFree", {
		is: false,
		then: (schema) => schema.required("Price is required").min(1),
		otherwise: (schema) => schema.notRequired(),
	}),
	url: string().url("Invalid url").notRequired(),
	location: string().notRequired(),
	// startDateTime: date().required("Start date is required"),
	// endDateTime: date().required("End date is required"),
	imageUrl: string().required("Photo is required"),
	date: date().required("Date is required"),
});

interface FormProps {
	editEvent?: boolean;
	data?: Partial<Omit<Event, "createdAt" | "updatedAt">>;
	// action: (values: Partial<Omit<Event, "createdAt" | "updatedAt">>) => void;
}

export default function Form({
	editEvent = false,
	data /* action */,
}: FormProps) {
	let initialValues;

	if (editEvent && data) {
		initialValues = {
			description: data.description,
			category: data.categoryId,
			title: data.title,
			isFree: data.isFree,
			location: data.location,
			url: data.url,
			price: data.price,
			imageUrl: data.imageUrl,
			date: data.startDateTime,
		};
	} else {
		initialValues = {
			description: "",
			category: "",
			title: "",
			isFree: false,
			location: "",
			url: "",
			price: "",
			imageUrl: "",
			date: new Date(),
		};
	}

	const {
		values,
		handleChange,
		handleSubmit,
		touched,
		handleBlur,
		setFieldValue,
		errors,
		submitCount,
	} = useFormik({
		initialValues,
		onSubmit: (values) => {
			//
			console.log(values);
		},
		validationSchema: validateSchema,
		validateOnMount: false,
		// initialTouched: {
		// 	date: true,
		// },

		// validate: validateSchema,
	});

	console.log(submitCount, errors);

	return (
		<form onSubmit={handleSubmit}>
			<h1 className="text-xl lg:text-4xl font-bold">Create Event</h1>
			<div className="w-full space-y-5 pt-3">
				<div className="space-y-2">
					<Label>Category</Label>
					<ComboBox />
					{submitCount > 0 && errors.category && (
						<span className="error-message">{errors.category}</span>
					)}
				</div>

				<div className="space-y-1">
					<Label htmlFor="title">Title</Label>
					<Input
						type="title"
						value={values.title}
						onBlur={handleBlur}
						onChange={handleChange}
						id="title"
						name="title"
						placeholder="Title"
					/>
					{touched.title && errors.title && (
						<span className="error-message">{errors.title}</span>
					)}
				</div>

				<div className="space-y-1">
					<Label htmlFor="description">Description</Label>
					<Textarea
						name="description"
						id="description"
						rows={5}
						onBlur={handleBlur}
						onChange={handleChange}
						value={values.description as string}
						placeholder="Reprehenderit elit commodo elit ut esse consectetur non non consequat anim deserunt anim aliquip sint."
					/>
				</div>

				<div className="flex items-center  justify-between sm:justify-normal sm:space-x-5">
					<Label
						htmlFor="isFree"
						className={`${
							!values.isFree ? "text-stone-950" : "text-stone-400"
						} cursor-pointer`}>
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
							values.isFree ? "text-stone-950" : "text-stone-400"
						} cursor-pointer`}>
						Free Event?
					</Label>
				</div>

				<div className="space-y-1">
					<Label
						htmlFor="price"
						className={`${values.isFree && "text-stone-400"} `}>
						Price
					</Label>
					<Input
						type="price"
						value={values.price}
						onChange={handleChange}
						id="price"
						onBlur={handleBlur}
						name="price"
						disabled={values.isFree}
						placeholder="00.00"
					/>

					{touched.price && errors.price && (
						<span className="error-message">{errors.price}</span>
					)}
				</div>

				<div className="space-y-1">
					<Label className="block" htmlFor="date">
						Date
					</Label>
					<DatePicker
						handleBlur={handleBlur("date")}
						handleChange={setFieldValue}
					/>
					{submitCount > 0 && errors.date && (
						<span className="error-message"> {errors.date as any} </span>
					)}
				</div>

				<div>
					<SingleFileUpload
						photo={values.imageUrl as string}
						setPhoto={(url: string) => setFieldValue("imageUrl", url)}
					/>
					{submitCount > 0 && errors.imageUrl && (
						<span className="error-message"> {errors.imageUrl} </span>
					)}
				</div>

				<Button type="submit">Create Event</Button>
			</div>
		</form>
	);
}
