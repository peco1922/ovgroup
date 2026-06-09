import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["pt", "en", "fr", "it", "es"],
  defaultLocale: "pt",
  localePrefix: "as-needed", // PT at /, others at /en, /fr, /it, /es
});

export type Locale = (typeof routing.locales)[number];
