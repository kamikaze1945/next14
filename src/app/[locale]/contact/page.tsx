import { ContactForm } from "@/app/[locale]/contact/contactForm";
import { PageTitle } from "@/ui/atoms/PageTitle";
import { getTranslations } from "next-intl/server";

export default async function ContactPage() {
	const t = await getTranslations("Contact");
	return (
		<div className="mx-auto w-full max-w-sm p-8">
			<PageTitle param={t("title")} />
			<ContactForm />
		</div>
	);
}
