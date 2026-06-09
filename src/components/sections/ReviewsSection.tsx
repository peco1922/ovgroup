"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import reviewsData from "@/../data/reviews.json";

function StarRating({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" }) {
  const px = size === "md" ? "h-5 w-5" : "h-4 w-4";
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} estrelas`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className={`${px} ${i <= rating ? "text-amber-400" : "text-gray-200"}`}
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function GoogleLogo() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 flex-shrink-0" aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

function Avatar({ name, color }: { name: string; color: string }) {
  const initial = name.charAt(0).toUpperCase();
  return (
    <div
      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0 select-none"
      style={{ backgroundColor: color }}
      aria-hidden="true"
    >
      {initial}
    </div>
  );
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("pt-PT", { month: "long", year: "numeric" });
}

export default function ReviewsSection() {
  const t = useTranslations("reviews");
  const { overall_rating, total_count, reviews } = reviewsData;

  return (
    <section className="section-pad bg-surface overflow-hidden">
      <div className="max-content container-pad">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12"
        >
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-ink tracking-tight mb-3">
              {t("title")}
            </h2>
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-ink">{overall_rating}</span>
              <div className="space-y-1">
                <StarRating rating={5} size="md" />
                <p className="text-xs text-ink-muted">
                  {total_count} {t("count_label")}
                </p>
              </div>
            </div>
          </div>
          <a
            href="https://g.page/r/openvisiongroup/review"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-canvas hover:bg-white hover:shadow-sm transition-all duration-200 text-sm font-medium text-ink-muted hover:text-ink self-start sm:self-auto"
          >
            <GoogleLogo />
            {t("cta_label")}
          </a>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 xl:gap-5">
          {reviews.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.55,
                delay: i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex flex-col gap-4 p-5 rounded-2xl bg-canvas border border-border/50 hover:border-border hover:shadow-sm transition-all duration-200"
            >
              {/* Top row */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <Avatar name={review.author} color={review.avatar_color} />
                  <div className="min-w-0">
                    <p className="font-semibold text-sm text-ink truncate">{review.author}</p>
                    <p className="text-xs text-ink-muted mt-0.5">{formatDate(review.date)}</p>
                  </div>
                </div>
                <GoogleLogo />
              </div>

              {/* Stars */}
              <StarRating rating={review.rating} />

              {/* Text */}
              <p className="text-sm text-ink-muted leading-relaxed flex-1">
                &ldquo;{review.text}&rdquo;
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
