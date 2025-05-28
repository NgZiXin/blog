import ContactForm from "@/components/contact/ContactForm";

export default function Contact() {
  return (
    <main className="p-8 sm:p-12">
      <div className="max-w-lg w-full mx-auto">
        <h1 className="text-3xl font-bold mb-6">Contact Me</h1>
        <ContactForm />
      </div>
    </main>
  );
}
