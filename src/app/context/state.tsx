"use client";
import React from "react";
interface InitialState {
	categoryId: string;
	handleCategoryId: (id: string) => void;
}

const initialState = {
	categoryId: "*",
	handleCategoryId: () => {},
};

export const StatesContext = React.createContext<InitialState>(initialState);

export default function States({ children }: { children: React.ReactNode }) {
	const [categoryId, setCategoryId] = React.useState(initialState.categoryId);

	const handleCategoryId = (id: string) => setCategoryId(id);

	return (
		<StatesContext.Provider
			value={{
				categoryId,
				handleCategoryId,
			}}>
			{children}
		</StatesContext.Provider>
	);
}
