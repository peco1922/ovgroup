import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { MapPin, Phone, Mail } from "lucide-react";
import ContactForm from "@/components/contact/ContactForm";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return { title: t("hero_title") };
}

export default async function ContactPage() {
  const t = await getTranslations("contact");

  return (
    <>
      {/* Hero */}
      <section className="bg-dark section-pad">
        <div className="max-content container-pad space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold text-ink-on-dark tracking-tight">
            {t("hero_title")}
          </h1>
          <p className="text-lg text-ink-on-dark/70 max-w-xl">{t("hero_subtitle")}</p>
        </div>
      </section>

      {/* Content */}
      <section className="section-pad bg-canvas">
        <div className="max-content container-pad grid md:grid-cols-5 gap-12">
          {/* Form */}
          <div className="md:col-span-3">
            <ContactForm />
          </div>

          {/* Contact info */}
          <div className="md:col-span-2 space-y-8">
            <div className="space-y-6 p-8 rounded-2xl bg-surface">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-brand-pink/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-4 w-4 text-brand-pink" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-ink-subtle mb-1">
                    {t("address_label")}
                  </p>
                  <p className="text-sm text-ink">Portugal</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-brand-pink/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="h-4 w-4 text-brand-pink" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-ink-subtle mb-1">
                    {t("phone_label")}
                  </p>
                  <a
                    href="tel:+351000000000"
                    className="text-sm text-ink hover:text-brand-pink transition-colors"
                  >
                    +351 000 000 000
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-brand-pink/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="h-4 w-4 text-brand-pink" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-ink-subtle mb-1">
                    {t("email_label")}
                  </p>
                  <a
                    href="mailto:geral@ovgroup.pt"
                    className="text-sm text-ink hover:text-brand-pink transition-colors"
                  >
                    geral@ovgroup.pt
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
