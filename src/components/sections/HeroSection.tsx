"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";

const BANNERS = [
  { src: "/images/hero/banner-1.png", alt: "OpenVision Group — Merchandising" },
  { src: "/images/hero/banner-2.png", alt: "OpenVision Group — Têxtil" },
  { src: "/images/hero/banner-3.png", alt: "OpenVision Group — Branding" },
];

export default function HeroSection() {
  const t = useTranslations("hero");
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % BANNERS.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + BANNERS.length) % BANNERS.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [paused, next]);

  return (
    <section
      className="relative bg-dark min-h-[88dvh] flex items-end overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slideshow images */}
      <AnimatePresence mode="sync">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={BANNERS[current].src}
            alt={BANNERS[current].alt}
            fill
            priority={current === 0}
            className="object-cover object-center"
            sizes="100vw"
          />
        </motion.div>
      </AnimatePresence>

      {/* Gradient overlay — dark at bottom for text, subtle at top */}
      <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/50 to-dark/20 pointer-events-none" />

      {/* Ambient glow */}
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-brand-pink/15 blur-[120px] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-content container-pad w-full pb-20 pt-32">
        <div className="max-w-2xl space-y-8">
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
            className="text-lg text-ink-on-dark/75 leading-relaxed"
          >
            {t("subheadline")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap gap-4"
          >
            <Button size="lg" render={<Link href="/contact" />}>
              {t("cta_primary")}
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 text-ink-on-dark bg-transparent hover:bg-white/10 hover:text-ink-on-dark hover:border-white/50"
              render={<Link href="/projects" />}
            >
              {t("cta_secondary")}
            </Button>
          </motion.div>
        </div>

        {/* Slideshow controls */}
        <div className="flex items-center gap-4 mt-12">
          {/* Dot indicators */}
          <div className="flex items-center gap-2">
            {BANNERS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Slide ${i + 1}`}
                className={`transition-all duration-300 rounded-full ${
                  i === current
                    ? "w-8 h-2 bg-brand-pink"
                    : "w-2 h-2 bg-white/40 hover:bg-white/60"
                }`}
              />
            ))}
          </div>

          {/* Prev/Next */}
          <div className="flex items-center gap-1 ml-2">
            <button
              onClick={prev}
              aria-label="Slide anterior"
              className="p-1.5 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={next}
              aria-label="Próximo slide"
              className="p-1.5 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
