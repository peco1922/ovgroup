import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import brandsData from "@/../data/brands.json";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "brands" });
  return { title: t("hero_title") };
}

export default async function BrandsPage() {
  const t = await getTranslations("brands");

  return (
    <>
      {/* Hero */}
      <section className="bg-dark section-pad">
        <div className="max-content container-pad space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold text-ink-on-dark tracking-tight">
            {t("hero_title")}
          </h1>
          <p className="text-lg text-ink-on-dark/70 max-w-xl">{t("intro")}</p>
        </div>
      </section>

      {/* Brands grid */}
      <section className="section-pad bg-canvas">
        <div className="max-content container-pad">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
            {brandsData.map((brand) => (
              <div
                key={brand.id}
                className="group flex items-center justify-center p-8 rounded-2xl bg-surface hover:bg-canvas border border-transparent hover:border-border hover:shadow-md transition-all duration-300 aspect-[3/2]"
              >
                <div className="relative w-full h-12">
                  <Image
                    src={`/images/brands/${brand.logo}`}
                    alt={brand.name}
                    fill
                    sizes="200px"
                    className="object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
