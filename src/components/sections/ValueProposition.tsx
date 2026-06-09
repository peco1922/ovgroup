import { getTranslations } from "next-intl/server";

export default async function ValueProposition() {
  const t = await getTranslations("value_prop");

  const stats = ["experience", "team", "custom"] as const;

  return (
    <section className="section-pad bg-dark relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px] bg-gradient-to-r from-transparent via-brand-pink/30 to-transparent" />

      <div className="max-content container-pad">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-ink-on-dark tracking-tight">
            {t("title")}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-12">
          {stats.map((key, i) => (
            <div
              key={key}
              className="text-center space-y-3 p-8 rounded-2xl bg-dark-2 border border-white/5 hover:border-brand-pink/20 transition-colors duration-300"
            >
              <div className="text-5xl font-bold text-brand-pink tracking-tight">
                {t(`items.${key}.number`)}
              </div>
              <div className="text-base font-semibold text-ink-on-dark">
                {t(`items.${key}.label`)}
              </div>
              <p className="text-sm text-ink-on-dark/60 leading-relaxed max-w-52 mx-auto">
                {t(`items.${key}.description`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
