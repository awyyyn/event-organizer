import { Skeleton } from "../ui/skeleton";

export default function EventCardSkeleton() {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 grid-flow-dense gap-5">
			<Skeleton className="min-h-[250px] md:min-h-[200px]" />
			<Skeleton className="min-h-[250px] md:min-h-[200px]" />
			<Skeleton className="min-h-[250px] md:min-h-[200px]" />
			<Skeleton className="min-h-[250px] md:min-h-[200px]" />
			<Skeleton className="min-h-[250px] md:min-h-[200px]" />
		</div>
	);
}
