"use client";
import { UploadButton, UploadDropzone } from "@/lib/uploadthing";
import React from "react";

const SingleFileUpload = () => {
	return (
		<UploadButton
			endpoint="imageUploader"
			appearance={{}}
			config={{
				mode: "auto",
			}}
			//  appearance={}
			onClientUploadComplete={(res) => {
				// Do something with the response
				console.log("Files: ", res);
				alert("Upload Completed");
			}}
			onUploadError={(error: Error) => {
				// Do something with the error.
				alert(`ERROR! ${error.message}`);
			}}
		/>
	);
};

export default SingleFileUpload;
