import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from "lucide-react";
import projectsData from "@/../data/projects.json";
import type { Locale } from "@/i18n/routing";

const SLUG_TO_FOLDER: Record<string, string> = {
  "fck-kobenhavn": "fck-kobenhavn",
  "bostik": "bostik",
  "era-imobiliaria": "era",
  "dibble": "dibble",
};

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "projects" });
  return { title: t("hero_title") };
}

export default async function ProjectsPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations("projects");
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

      {/* Projects grid */}
      <section className="section-pad bg-canvas">
        <div className="max-content container-pad">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectsData.map((project) => {
              const folder = SLUG_TO_FOLDER[project.slug] ?? project.slug;
              return (
                <Link
                  key={project.slug}
                  href={`/projects/${project.slug}` as `/projects/${string}`}
                  className="group rounded-2xl overflow-hidden bg-surface border border-border/50 hover:border-brand-pink/30 hover:shadow-lg transition-all duration-300"
                >
                  <div className="relative aspect-[4/3] bg-dark-2 overflow-hidden">
                    <Image
                      src={`/images/projects/${folder}/${project.images[0]}`}
                      alt={project.client}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-transparent to-transparent" />
                    <Badge className="absolute bottom-4 left-4 bg-white/20 text-white border-none text-xs backdrop-blur-sm">
                      {project.category}
                    </Badge>
                  </div>
                  <div className="p-5 flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-ink group-hover:text-brand-pink transition-colors">
                        {project.client}
                      </h3>
                      <p className="text-sm text-ink-muted mt-0.5">{project.year}</p>
                    </div>
                    <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-ink-muted group-hover:bg-brand-pink group-hover:border-brand-pink group-hover:text-white transition-all duration-200">
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
