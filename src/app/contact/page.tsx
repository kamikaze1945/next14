import { ContactForm } from "@/app/contact/contactForm";
import { PageTitle } from "@/ui/atoms/PageTitle";

export default async function ContactPage() {
	return (
		<div className="mx-auto w-full max-w-sm p-8">
			<PageTitle param="Contact" />
			<ContactForm />
		</div>
	);
}
