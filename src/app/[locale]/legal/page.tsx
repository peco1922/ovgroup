import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { FileDown } from "lucide-react";
import type { Locale } from "@/i18n/routing";
import csrData from "@/../data/csr.json";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal" });
  return { title: t("hero_title") };
}

export default async function LegalPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations("legal");
  const loc = locale as Locale;

  return (
    <>
      {/* Hero */}
      <section className="bg-dark section-pad">
        <div className="max-content container-pad">
          <h1 className="text-4xl sm:text-5xl font-bold text-ink-on-dark tracking-tight">
            {t("hero_title")}
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="section-pad bg-canvas">
        <div className="max-content container-pad max-w-3xl mx-auto space-y-10">
          <p className="text-base text-ink-muted leading-relaxed">{t("intro")}</p>

          {/* EU funding text */}
          <div className="p-8 rounded-2xl bg-surface border border-border space-y-4">
            <h2 className="text-lg font-semibold text-ink">
              Apoios Comunitários / Community Support
            </h2>
            <p className="text-sm text-ink-muted leading-relaxed">
              {csrData.eu_funding.text[loc] ?? csrData.eu_funding.text.pt}
            </p>
          </div>

          {/* PDF downloads */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-ink">{t("downloads_title")}</h2>
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

          {/* Privacy and Terms */}
          <div className="space-y-3 pt-2 border-t border-border">
            <h2 className="text-lg font-semibold text-ink pt-6">{t("privacy")}</h2>
            <p className="text-sm text-ink-muted">
              Em breve / Coming soon.
            </p>
            <h2 className="text-lg font-semibold text-ink pt-4">{t("terms")}</h2>
            <p className="text-sm text-ink-muted">
              Em breve / Coming soon.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
