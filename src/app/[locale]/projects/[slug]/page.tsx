import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight } from "lucide-react";
import projectsData from "@/../data/projects.json";
import type { Locale } from "@/i18n/routing";

const SLUG_TO_FOLDER: Record<string, string> = {
  "fck-kobenhavn": "fck-kobenhavn",
  "bostik": "bostik",
  "era-imobiliaria": "era",
  "dibble": "dibble",
};

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  return projectsData.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);
  if (!project) return {};
  return { title: project.client };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  const t = await getTranslations("projects");
  const tCta = await getTranslations("cta_banner");
  const loc = locale as Locale;

  const project = projectsData.find((p) => p.slug === slug);
  if (!project) notFound();

  const folder = SLUG_TO_FOLDER[project.slug] ?? project.slug;

  return (
    <>
      {/* Hero */}
      <section className="bg-dark py-16">
        <div className="max-content container-pad">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-ink-on-dark/60 hover:text-ink-on-dark transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("hero_title")}
          </Link>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-2">
              <Badge className="bg-brand-pink/20 text-brand-pink border-none">
                {project.category}
              </Badge>
              <h1 className="text-3xl sm:text-4xl font-bold text-ink-on-dark tracking-tight">
                {project.client}
              </h1>
              <p className="text-ink-on-dark/60">{project.year}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Images */}
      <section className="bg-surface py-12">
        <div className="max-content container-pad">
          <div className="grid grid-cols-1 gap-6">
            {project.images.map((img) => (
              <div
                key={img}
                className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-dark-2"
              >
                <Image
                  src={`/images/projects/${folder}/${img}`}
                  alt={`${project.client} — ${project.category}`}
                  fill
                  sizes="(max-width: 1200px) 100vw, 1200px"
                  className="object-cover"
                  priority
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="section-pad bg-canvas">
        <div className="max-content container-pad max-w-2xl mx-auto">
          <p className="text-lg text-ink leading-relaxed">
            {project.description[loc] ?? project.description.pt}
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-surface">
        <div className="max-content container-pad text-center space-y-6">
          <h2 className="text-2xl font-bold text-ink">{tCta("title")}</h2>
          <Button render={<Link href="/contact" />} size="lg">
            {tCta("cta")}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </section>
    </>
  );
}
