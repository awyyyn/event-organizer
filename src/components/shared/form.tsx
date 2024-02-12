"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useFormik } from "formik";
import { boolean, date, number, object, string } from "yup";

import React from "react";
import DatePicker from "@/components/shared/date-picker";
import { Switch } from "@/components/ui/switch";
import SingleFileUpload from "./single-file-upload";
import { Event } from "@prisma/client";
import { ComboBox } from "./combobox";
import { SelectTime } from "./select-time";
import { ToastAction } from "../ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { AiOutlineLoading } from "react-icons/ai";
import { useRouter } from "next/navigation";

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
	endDate: date().notRequired(),
	startDate: date().required("Date is required"),
	startTime: string().required("Start time is required"),
	endTime: string().required("End time is required"),
	imageUrl: string().required("Photo is required"),
});

interface FormProps {
	editEvent?: boolean;
	label: string;
	data?: Partial<Omit<Event, "createdAt" | "updatedAt">>;
	action: (
		values: Partial<Omit<Event, "createdAt" | "updatedAt">>
	) => Promise<Event>;
}

export default function Form({
	editEvent = false,
	data,
	action,
	label,
}: FormProps) {
	const router = useRouter();
	let initialValues;
	const { toast } = useToast();

	if (editEvent && data) {
		initialValues = {
			description: data.description,
			category: data.categoryId,
			title: data.title,
			isFree: data.isFree,
			location: data.location,
			startTime: data.startTime,
			endTime: data.endTime,
			url: data.url,
			price: data.price,
			imageUrl: data.imageUrl,
			startDate: data.startDate,
			endDate: data.endDate,
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
			startDate: new Date(),
			endDate: new Date(),
			startTime: "",
			endTime: "",
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
		resetForm,
		submitCount,
		isSubmitting,
	} = useFormik({
		initialValues,
		onSubmit: async (values) => {
			const event = await action({
				categoryId: values.category,
				description: values.description,
				title: values.title,
				isFree: values.isFree,
				location: values.location,
				startTime: values.startTime,
				endTime: values.endTime,
				url: values.url,
				price: values.isFree ? 0 : Number(values.price),
				imageUrl: values.imageUrl,
				startDate: values.startDate,
				endDate: values.endDate ?? new Date(),
				id: data?.id,
			});
			if (event.id) {
				router.push(`/event/${event.id}`);
				toast({
					variant: "default",
					className: "bg-green-600 z-5  text-white",
					description: "Event successfully created!",
				});
			} else {
				toast({
					variant: "destructive",
					title: "Uh oh! Something went wrong.",
					description: "There was a problem with your request.",
				});
			}

			console.log(event, "s");
		},
		validationSchema: validateSchema,
		validateOnMount: false,
	});

	return (
		<form onSubmit={handleSubmit}>
			<h1 className="text-xl lg:text-4xl font-bold">{label}</h1>
			<div className="w-full space-y-5 pt-3">
				<div className="space-y-2">
					<Label>Category</Label>
					<ComboBox
						setFieldValue={(value) => setFieldValue("category", value)}
						handleBlur={() => handleBlur("category")}
					/>
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
					<Label htmlFor="url">URL</Label>
					<Input
						type="url"
						value={values.url as string}
						onBlur={handleBlur}
						onChange={handleChange}
						id="url"
						name="url"
						placeholder="https://www.example.url"
					/>
					{touched.url && errors.url && (
						<span className="error-message">{errors.url}</span>
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
						type="number"
						value={values.price as number}
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
					<DatePicker handleChange={setFieldValue} />
					{submitCount > 0 && errors.startDate && (
						<span className="error-message"> {errors.startDate as any} </span>
					)}
				</div>

				<div className="space-y-1">
					<Label htmlFor="start-time">Start time</Label>
					<SelectTime
						handleChange={(v) => setFieldValue("startTime", v)}
						handleBlur={() => handleBlur("startTime")}
					/>
					{submitCount > 0 && errors.startTime && (
						<span className="error-message"> {errors.startTime} </span>
					)}
				</div>

				<div className="space-y-1">
					<Label htmlFor="end-time">End time</Label>
					<SelectTime
						label="end"
						handleChange={(v) => setFieldValue("endTime", v)}
						handleBlur={() => handleBlur("endTime")}
					/>
					{submitCount > 0 && errors.endTime && (
						<span className="error-message"> {errors.endTime} </span>
					)}
				</div>

				<div className="space-y-1">
					<Label htmlFor="image-url">Event Cover</Label>
					<SingleFileUpload
						photo={values.imageUrl as string}
						setPhoto={(url: string) => setFieldValue("imageUrl", url)}
					/>
					{submitCount > 0 && errors.imageUrl && (
						<span className="error-message"> {errors.imageUrl} </span>
					)}
				</div>

				<Button type="submit" className="w-full" disabled={isSubmitting}>
					{isSubmitting ? (
						<>
							<AiOutlineLoading className="animate-spin" />
							Creating your event...
						</>
					) : (
						"Create Event"
					)}
				</Button>
			</div>
		</form>
	);
}
