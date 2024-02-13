import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
	publicRoutes: [
		"/",
		"/api/webhook/clerk",
		"/api/uploadthing",
		"/api/events",
		"/api/event",
		"/api/event/:eventId",
	],
	ignoredRoutes: [
		"/api/webhook/clerk",
		"/api/uploadthing",
		"/api/events",
		"/api/event",
		"/api/event/:eventId",
	],
	// apiRoutes: ["/api/events", "/api/event"],

	// debug: true,
});

export const config = {
	matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
