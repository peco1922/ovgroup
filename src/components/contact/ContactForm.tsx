"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Send, CheckCircle, AlertCircle } from "lucide-react";

type Status = "idle" | "sending" | "success" | "error";

export default function ContactForm() {
  const t = useTranslations("contact.form");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      // TODO: Replace with your preferred form handler
      // Options: Resend, Formspree, Netlify Forms, or a Next.js API route
      // Example with Formspree: POST to https://formspree.io/f/{id}
      await new Promise((r) => setTimeout(r, 800)); // placeholder delay
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  const inputClass =
    "w-full rounded-lg border border-border bg-canvas px-4 py-3 text-sm text-ink placeholder:text-ink-subtle focus:outline-none focus:ring-2 focus:ring-brand-pink/40 focus:border-brand-pink transition-colors";
  const labelClass = "block text-sm font-medium text-ink mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className={labelClass}>{t("name")}</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className={inputClass}
            placeholder={t("name")}
          />
        </div>
        <div>
          <label htmlFor="company" className={labelClass}>{t("company")}</label>
          <input
            id="company"
            name="company"
            type="text"
            className={inputClass}
            placeholder={t("company")}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="email" className={labelClass}>{t("email")}</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={inputClass}
            placeholder="email@empresa.pt"
          />
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>{t("phone")}</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className={inputClass}
            placeholder="+351 9XX XXX XXX"
          />
        </div>
      </div>

      <div>
        <label htmlFor="service" className={labelClass}>{t("service")}</label>
        <select id="service" name="service" className={inputClass}>
          <option value="">{t("service_options.default")}</option>
          <option value="merchandising">{t("service_options.merchandising")}</option>
          <option value="textile">{t("service_options.textile")}</option>
          <option value="branding">{t("service_options.branding")}</option>
          <option value="presence">{t("service_options.presence")}</option>
          <option value="other">{t("service_options.other")}</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>{t("message")}</label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className={`${inputClass} resize-none`}
          placeholder={t("message")}
        />
      </div>

      {status === "success" && (
        <div className="flex items-center gap-2 rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700">
          <CheckCircle className="h-4 w-4 flex-shrink-0" />
          {t("success")}
        </div>
      )}

      {status === "error" && (
        <div className="flex items-center gap-2 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          {t("error")}
        </div>
      )}

      <Button
        type="submit"
        size="lg"
        className="w-full sm:w-auto"
        disabled={status === "sending"}
      >
        {status === "sending" ? (
          <span className="flex items-center gap-2">
            <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
            {t("submit")}
          </span>
        ) : (
          <>
            <Send className="h-4 w-4" />
            {t("submit")}
          </>
        )}
      </Button>
    </form>
  );
}
