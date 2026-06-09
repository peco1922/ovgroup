import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Shirt, Palette, MapPin, ArrowRight } from "lucide-react";

const SERVICE_ICONS = {
  merchandising: ShoppingBag,
  textile: Shirt,
  branding: Palette,
  presence: MapPin,
} as const;

type ServiceKey = keyof typeof SERVICE_ICONS;

export default async function ServicesPreview() {
  const t = await getTranslations("services_preview");
  const services: ServiceKey[] = ["merchandising", "textile", "branding", "presence"];

  return (
    <section className="section-pad bg-canvas">
      <div className="max-content container-pad">
        <div className="text-center mb-14 space-y-3">
          <h2 className="text-3xl sm:text-4xl font-bold text-ink tracking-tight">
            {t("title")}
          </h2>
          <p className="text-base text-ink-muted max-w-xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((key) => {
            const Icon = SERVICE_ICONS[key];
            return (
              <Link
                key={key}
                href="/services"
                className="group p-7 rounded-2xl bg-surface hover:bg-canvas border border-transparent hover:border-border hover:shadow-md transition-all duration-300 space-y-4"
              >
                <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-brand-pink/10 text-brand-pink group-hover:bg-brand-pink group-hover:text-white transition-all duration-300">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-ink mb-2 leading-snug">
                    {t(`items.${key}.title`)}
                  </h3>
                  <p className="text-sm text-ink-muted leading-relaxed">
                    {t(`items.${key}.description`)}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-sm font-medium text-brand-pink opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-300">
                  <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            render={<Link href="/services" />}
          >
            {t("cta")}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
