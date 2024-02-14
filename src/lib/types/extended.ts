import { Category, Order, User, Event } from "@prisma/client";

export interface EventResult extends Event {
	eventBy: User;
	category: Category;
	_count?: {
		orders: number;
	};
	orders?: Order[];
}
