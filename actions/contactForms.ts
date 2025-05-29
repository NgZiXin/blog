"use server";

import pool from "@/lib/db";
import ContactForm from "@/types/ContactForm";

export async function saveNewContactForm(form: ContactForm) {
  const { email, message } = form;

  await pool.query(
    `INSERT INTO contact_forms (email, message) VALUES ($1, $2)`,
    [email, message]
  );
}