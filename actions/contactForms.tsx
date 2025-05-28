"use server";

import path from "path";
import fs from "fs/promises";
import ContactForm from "@/types/ContactForm";

export const contactFormsFilePath = path.join(
  process.cwd(),
  "data",
  "contactForms.json"
);

export async function saveNewContactForm(form: ContactForm) {
  const forms = await getContactForms();
  await fs.writeFile(
    contactFormsFilePath,
    JSON.stringify([...forms, form], null, 2),
    "utf-8"
  );
}

export async function getContactForms(): Promise<ContactForm[]> {
  const fileContent = await fs.readFile(contactFormsFilePath, "utf-8");
  return JSON.parse(fileContent);
}
