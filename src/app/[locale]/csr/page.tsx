import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Leaf, Heart, Shield, FileDown } from "lucide-react";
import csrData from "@/../data/csr.json";
import type { Locale } from "@/i18n/routing";

const CAUSE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  sustainability: Leaf,
  community: Heart,
  ethics: Shield,
};

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "csr" });
  return { title: t("hero_title") };
}

export default async function CsrPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations("csr");
  const loc = locale as Locale;

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

      {/* Certification */}
      <section className="py-12 bg-canvas border-b border-border/40">
        <div className="max-content container-pad">
          <div className="flex flex-wrap items-center gap-6 p-8 rounded-2xl bg-surface">
            <div className="w-12 h-12 rounded-xl bg-brand-pink/10 flex items-center justify-center flex-shrink-0">
              <Shield className="h-6 w-6 text-brand-pink" />
            </div>
            <div>
              <p className="font-semibold text-ink">{csrData.certifications[0].name}</p>
              <p className="text-sm text-ink-muted mt-1 max-w-2xl">
                {csrData.certifications[0].description[loc] ?? csrData.certifications[0].description.pt}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our values / causes */}
      <section className="section-pad bg-canvas">
        <div className="max-content container-pad">
          <h2 className="text-2xl sm:text-3xl font-bold text-ink tracking-tight mb-12">
            {t("causes_title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {csrData.causes.map((cause) => {
              const Icon = CAUSE_ICONS[cause.id] ?? Leaf;
              return (
                <div key={cause.id} className="space-y-4 p-8 rounded-2xl bg-surface border border-border/40">
                  <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-brand-pink/10 text-brand-pink">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-ink">
                    {cause.title[loc] ?? cause.title.pt}
                  </h3>
                  <p className="text-sm text-ink-muted leading-relaxed">
                    {cause.description[loc] ?? cause.description.pt}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Supported organizations */}
      <section className="section-pad bg-surface">
        <div className="max-content container-pad">
          <h2 className="text-2xl sm:text-3xl font-bold text-ink tracking-tight mb-12">
            {t("causes_title")} — Organizações Apoiadas
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {csrData.organizations.map((org) => (
              <div
                key={org.id}
                className="p-6 rounded-2xl bg-canvas border border-border/50 hover:border-brand-pink/30 hover:shadow-sm transition-all duration-200 space-y-3"
              >
                <div className="w-10 h-10 rounded-lg bg-brand-pink/10 flex items-center justify-center">
                  <Heart className="h-4 w-4 text-brand-pink" />
                </div>
                <h3 className="font-semibold text-ink">{org.name}</h3>
                <p className="text-sm text-ink-muted leading-relaxed">
                  {org.description[loc] ?? org.description.pt}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EU Funding + PDFs */}
      <section className="section-pad bg-canvas">
        <div className="max-content container-pad max-w-4xl mx-auto space-y-10">
          <div className="p-8 rounded-2xl bg-surface border border-border space-y-4">
            <h2 className="text-xl font-semibold text-ink">{t("certifications_title")}</h2>
            <p className="text-sm text-ink-muted leading-relaxed">
              {csrData.eu_funding.text[loc] ?? csrData.eu_funding.text.pt}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-ink mb-6">Documentos</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {csrData.pdf_downloads.map((pdf) => (
                <a
                  key={pdf.id}
                  href={`/docs/${pdf.filename}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 p-4 rounded-xl border border-border hover:border-brand-pink/40 bg-surface hover:bg-canvas transition-all duration-200"
                >
                  <div className="w-9 h-9 rounded-lg bg-brand-pink/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-pink/20 transition-colors">
                    <FileDown className="h-4 w-4 text-brand-pink" />
                  </div>
                  <span className="text-sm text-ink group-hover:text-brand-pink transition-colors leading-tight">
                    {pdf.label}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
