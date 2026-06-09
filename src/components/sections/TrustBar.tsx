import { getTranslations } from "next-intl/server";
import Image from "next/image";
import brandsData from "@/../data/brands.json";

export default async function TrustBar() {
  const t = await getTranslations("trust");

  return (
    <section className="bg-surface border-y border-border/50 py-12">
      <div className="max-content container-pad">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-ink-subtle mb-10">
          {t("title")}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-10 md:gap-14">
          {brandsData.map((brand) => (
            <div
              key={brand.id}
              className="relative h-10 w-28 grayscale opacity-50 hover:opacity-80 hover:grayscale-0 transition-all duration-300"
            >
              <Image
                src={`/images/brands/${brand.logo}`}
                alt={brand.name}
                fill
                sizes="112px"
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
