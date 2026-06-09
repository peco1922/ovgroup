"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { ArrowRight, Play } from "lucide-react";

export default function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section className="relative bg-dark min-h-[88dvh] flex items-center overflow-hidden">
      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Ambient glow */}
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-brand-pink/10 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-content container-pad w-full py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Text block */}
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-flex items-center gap-2 text-brand-pink text-sm font-medium mb-6">
              <span className="h-px w-8 bg-brand-pink inline-block" />
              OpenVision Group
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-ink-on-dark leading-[1.08] tracking-[-0.03em]">
              {t("headline")}
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg text-ink-on-dark/70 leading-relaxed max-w-lg"
          >
            {t("subheadline")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap gap-4"
          >
            <Button
              size="lg"
              render={<Link href="/contact" />}
            >
              {t("cta_primary")}
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/20 text-ink-on-dark bg-transparent hover:bg-white/10 hover:text-ink-on-dark"
              render={<Link href="/projects" />}
            >
              <Play className="h-4 w-4" />
              {t("cta_secondary")}
            </Button>
          </motion.div>
        </div>

        {/* Image placeholder */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative aspect-[4/3] lg:aspect-square rounded-2xl overflow-hidden bg-dark-2"
        >
          {/* [AI_IMAGE_SUGGESTION: Premium branded merchandise flat-lay on dark stone surface — custom embroidered polo shirts, branded notebooks, corporate gifts and promotional textiles arranged elegantly with soft directional studio lighting, brand pink (#CC3366) accent highlights, professional commercial photography, overhead angle] */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-ink-on-dark/20">
            <div className="w-12 h-12 rounded-full border-2 border-dashed border-current flex items-center justify-center text-2xl">
              🖼
            </div>
            <span className="text-xs font-mono text-center px-6 leading-relaxed">
              Replace with professional product photography
            </span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
