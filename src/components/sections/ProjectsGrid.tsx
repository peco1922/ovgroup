import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import projectsData from "@/../data/projects.json";

const SLUG_TO_FOLDER: Record<string, string> = {
  "fck-kobenhavn": "fck-kobenhavn",
  "bostik": "bostik",
  "era-imobiliaria": "era",
  "dibble": "dibble",
};

export default async function ProjectsGrid() {
  const t = await getTranslations("projects_preview");

  const featured = projectsData.filter((p) => p.featured).slice(0, 3);

  return (
    <section className="section-pad bg-surface">
      <div className="max-content container-pad">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <h2 className="text-3xl sm:text-4xl font-bold text-ink tracking-tight">
              {t("title")}
            </h2>
            <p className="text-base text-ink-muted">{t("subtitle")}</p>
          </div>
          <Button
            variant="ghost"
            className="self-start sm:self-auto text-brand-pink hover:text-brand-pink hover:bg-brand-pink/5"
            render={<Link href="/projects" />}
          >
            {t("cta")}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((project) => {
            const folder = SLUG_TO_FOLDER[project.slug] ?? project.slug;
            return (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}` as `/projects/${string}`}
                className="group relative rounded-2xl overflow-hidden bg-canvas border border-border/50 hover:border-brand-pink/30 hover:shadow-lg transition-all duration-300"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] bg-dark-2 overflow-hidden">
                  <Image
                    src={`/images/projects/${folder}/${project.images[0]}`}
                    alt={project.client}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <Badge className="bg-white/20 text-white border-none text-xs backdrop-blur-sm">
                      {project.category}
                    </Badge>
                  </div>
                </div>

                {/* Content */}
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
  );
}
