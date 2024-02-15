import React from "react";
import { Skeleton } from "../ui/skeleton";

const FormSpinner = () => {
	return (
		<div className="lg:min-w-[20rema]   min-w-full shrink">
			<div className="space-y-5">
				<Skeleton className="h-10 w-2/3" />
				{[1, 2, 3].map((item, index) => (
					<div className="space-y-2" key={index}>
						<Skeleton className="h-5 w-1/3" />
						<Skeleton className="h-8 w-full" />
					</div>
				))}
				<div className="space-y-2">
					<Skeleton className="h-5 w-1/3" />
					<Skeleton className="h-32 w-full" />
				</div>
				<div>
					<Skeleton className="h-8 w-full" />
				</div>
				{[1, 2, 3, 4].map((item, index) => (
					<div className="space-y-2" key={index}>
						<Skeleton className="h-5 w-1/3" />
						<Skeleton className="h-8 w-full" />
					</div>
				))}

				<div className="space-y-2">
					<Skeleton className="h-5 w-1/3" />
					<Skeleton className="h-60 w-full" />
				</div>

				<div>
					<Skeleton className="h-9 w-full" />
				</div>
			</div>
		</div>
	);
};

export default FormSpinner;
