"use client";
import { UploadButton, UploadDropzone } from "@/lib/uploadthing";
import React, { useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { Button, buttonVariants } from "@/components/ui/button";
import Image from "next/image";

interface fileUploadProps {
	photo: string;
	setPhoto: (photo: string) => void;
}

const SingleFileUpload = ({ setPhoto, photo }: fileUploadProps) => {
	return (
		<>
			{photo ? (
				<div className="w-full h-60 border rounded-md overflow-hidden border-stone-400 relative">
					<Image
						src={photo}
						fill
						className="object-cover "
						placeholder="blur"
						blurDataURL="/blurdata.png"
						loading="lazy"
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
						alt="asd"
					/>
					<UploadButton
						endpoint="imageUploader"
						className="justify-self-end absolute  bottom-2 right-2 "
						content={{
							button: (args) => (args.isUploading ? "Uploading..." : "Replace"),
						}}
						appearance={{
							allowedContent: "hidden",
							button: "text-[16px]  h-7 w-24 text-xs bg-stone-950",
						}}
						onClientUploadComplete={(res) => setPhoto(res[0].url)}
					/>
				</div>
			) : (
				<div className="w-full  ">
					<UploadDropzone
						endpoint="imageUploader"
						appearance={{
							container: "h-60",
							label: "text-stone-600",
							button({ isUploading, uploadProgress }) {
								return `${uploadProgress && "bg-secondary"} `;
							},
						}}
						content={{
							uploadIcon: (
								<AiOutlineCloudUpload size={50} className="stroke-stone-600" />
							),
							label({ isUploading, uploadProgress }) {
								return isUploading
									? "Uploading your image..."
									: "Upload your image";
							},
						}}
						config={{
							mode: "auto",
							appendOnPaste: true,
						}}
						onClientUploadComplete={(res) => setPhoto(res[0].url)}
						onUploadError={(error: Error) => {
							// Do something with the error.
							alert(`ERROR! ${error.message}`);
						}}
					/>
				</div>
			)}
		</>
	);
};

export default SingleFileUpload;
