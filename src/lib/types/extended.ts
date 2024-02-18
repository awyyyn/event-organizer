import { Category, Order, User, Event } from "@prisma/client";
import { boolean, number } from "yup";

export interface EventResult extends Event {
	eventBy: User;
	category: Category;
	_count?: {
		orders: number;
	};
	orders?: Order[];
}

export interface InitialValues {
	description: string;
	category: string;
	title: string;
	isFree: boolean;
	location: string;
	startTime: string;
	endTime: string;
	url: string;
	price: number;
	imageUrl: string;
	startDate: Date;
	endDate: Date;
	id?: string;
	eventById?: string;
}
