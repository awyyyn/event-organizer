import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
	imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
		.onUploadError(({ error }) => {
			throw new Error(error.message);
		})
		.onUploadComplete(async ({ file }) => {
			console.log("file url", file.url);
			return { url: file.url };
		}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
