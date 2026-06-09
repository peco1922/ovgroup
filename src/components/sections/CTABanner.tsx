import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default async function CTABanner() {
  const t = await getTranslations("cta_banner");

  return (
    <section className="section-pad bg-brand-pink relative overflow-hidden">
      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative z-10 max-content container-pad text-center space-y-8">
        <div className="space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            {t("title")}
          </h2>
          <p className="text-lg text-white/80 max-w-xl mx-auto leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        <Button
          size="lg"
          className="bg-white text-brand-pink hover:bg-white/90 font-semibold px-8"
          render={<Link href="/contact" />}
        >
          {t("cta")}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </section>
  );
}
