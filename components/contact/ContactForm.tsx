"use client";

import { useState } from "react";
import { saveNewContactForm } from "@/actions/contactForms";

export default function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (formData: FormData) => {
    saveNewContactForm({
      email: formData.get("email") as string,
      message: formData.get("message") as string,
    });

    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <form action={handleSubmit} className="flex flex-col gap-y-5">
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Your Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="your_email@domain.com"
          required
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Leave a message..."
        ></textarea>
      </div>

      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            id="agree"
            type="checkbox"
            required
            className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 
                   focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 
                   dark:border-gray-600 dark:focus:ring-blue-600 
                   dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
          />
        </div>
        <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
          Agree to be Contacted
        </label>
      </div>

      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none 
               focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto 
               px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 
               dark:focus:ring-blue-800"
      >
        Submit
      </button>
      <div
        className={`
    p-4 text-sm rounded-lg
    ${
      isSubmitted
        ? "text-green-800 bg-green-50 dark:bg-gray-800 dark:text-green-400"
        : "invisible"
    }
    `}
      >
        <span className="font-medium">Success!</span> Your message has been
        sent.
      </div>
    </form>
  );
}
