import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import teamData from "@/../data/team.json";
import type { Locale } from "@/i18n/routing";
import { existsSync } from "fs";
import path from "path";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return { title: t("hero_title") };
}

const DEPT_ORDER = ["leadership", "sales", "production", "design", "marketing"];

const DEPT_LABELS: Record<string, Record<Locale, string>> = {
  leadership: { pt: "Liderança", en: "Leadership", fr: "Direction", it: "Leadership", es: "Liderazgo" },
  sales:      { pt: "Comercial", en: "Sales", fr: "Commercial", it: "Commerciale", es: "Comercial" },
  production: { pt: "Produção & Logística", en: "Production & Logistics", fr: "Production & Logistique", it: "Produzione & Logistica", es: "Producción & Logística" },
  design:     { pt: "Design & Web", en: "Design & Web", fr: "Design & Web", it: "Design & Web", es: "Diseño & Web" },
  marketing:  { pt: "Marketing", en: "Marketing", fr: "Marketing", it: "Marketing", es: "Marketing" },
};

function getInitials(name: string) {
  return name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();
}

function photoExists(filename: string): boolean {
  if (!filename) return false;
  const p = path.join(process.cwd(), "public/images/team", filename);
  return existsSync(p);
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations("about");
  const loc = locale as Locale;

  const byDept = DEPT_ORDER.map((dept) => ({
    dept,
    members: teamData.filter((m) => m.department === dept),
  })).filter((g) => g.members.length > 0);

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

      {/* Intro + Mission */}
      <section className="section-pad bg-canvas">
        <div className="max-content container-pad grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-ink tracking-tight">
              {t("intro_title")}
            </h2>
            <p className="text-base text-ink-muted leading-relaxed">{t("intro_text")}</p>
            <h3 className="text-xl font-semibold text-ink">{t("mission_title")}</h3>
            <p className="text-base text-ink-muted leading-relaxed">{t("mission_text")}</p>
          </div>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
            <Image
              src="/images/about-team.jpg"
              alt="Equipa OpenVision Group"
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Team by department */}
      <section className="section-pad bg-surface">
        <div className="max-content container-pad space-y-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-ink tracking-tight">
            {t("team_title")}
          </h2>

          {byDept.map(({ dept, members }) => (
            <div key={dept}>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-ink-subtle mb-8">
                {DEPT_LABELS[dept]?.[loc] ?? dept}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {members.map((member) => {
                  const hasPhoto = photoExists(member.photo);
                  return (
                    <div key={member.id} className="flex flex-col items-center gap-3 text-center">
                      {/* Circular photo — PNG files have transparent background */}
                      <div className="relative w-24 h-24">
                        {hasPhoto ? (
                          <Image
                            src={`/images/team/${member.photo}`}
                            alt={member.name}
                            width={96}
                            height={96}
                            className="w-24 h-24 object-contain"
                          />
                        ) : (
                          <div className="w-24 h-24 rounded-full bg-brand-pink/10 border-2 border-brand-pink/20 flex items-center justify-center">
                            <span className="text-brand-pink font-semibold text-lg">
                              {getInitials(member.name)}
                            </span>
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-ink text-sm leading-tight">
                          {member.name}
                        </p>
                        <p className="text-xs text-ink-muted mt-0.5">
                          {member.role[loc] ?? member.role.pt}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
