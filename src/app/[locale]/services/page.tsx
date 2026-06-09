import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingBag, Shirt, Palette, MapPin } from "lucide-react";
import servicesData from "@/../data/services.json";
import type { Locale } from "@/i18n/routing";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  ShoppingBag,
  Shirt,
  Palette,
  MapPin,
};

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });
  return { title: t("hero_title") };
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations("services");

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

      {/* Services */}
      <section className="section-pad bg-canvas">
        <div className="max-content container-pad space-y-16">
          {servicesData.map((service, i) => {
            const Icon = ICON_MAP[service.icon] ?? ShoppingBag;
            const isEven = i % 2 === 0;
            const loc = locale as Locale;

            return (
              <div
                key={service.id}
                className={`grid md:grid-cols-2 gap-12 items-center ${!isEven ? "md:[&>*:first-child]:order-2" : ""}`}
              >
                <div className="space-y-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-brand-pink/10 text-brand-pink">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-ink tracking-tight">
                    {service.title[loc] ?? service.title.pt}
                  </h2>
                  <p className="text-base text-ink-muted leading-relaxed">
                    {service.description[loc] ?? service.description.pt}
                  </p>
                  <ul className="space-y-2">
                    {(service.features[loc] ?? service.features.pt).map((feat) => (
                      <li key={feat} className="flex items-center gap-2 text-sm text-ink">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-pink flex-shrink-0" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant="outline"
                    render={<Link href="/contact" />}
                  >
                    {t("request_cta")}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>

                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-surface">
                  {/* [AI_IMAGE_SUGGESTION: Professional product photography showing {service.title} — premium merchandising and branding work] */}
                  <div className="absolute inset-0 flex items-center justify-center text-ink-subtle/30 text-xs font-mono">
                    {service.id}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
