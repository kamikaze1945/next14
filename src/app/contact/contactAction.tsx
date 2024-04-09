"use server";

import {
	ContactFormType,
	contactSchema,
} from "@/app/contact/contactSchema";
import { resolve } from "path";
import { set } from "zod";
console.log("contactActions");
export const contactAction = async (data: ContactFormType) => {
	await new Promise((resolve) => setTimeout(resolve, 2000));
	contactSchema.parse(data);
	console.log({ data });
};
