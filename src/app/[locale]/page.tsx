import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import HeroSection from "@/components/sections/HeroSection";
import TrustBar from "@/components/sections/TrustBar";
import ServicesPreview from "@/components/sections/ServicesPreview";
import ProjectsGrid from "@/components/sections/ProjectsGrid";
import ReviewsSection from "@/components/sections/ReviewsSection";
import ValueProposition from "@/components/sections/ValueProposition";
import CTABanner from "@/components/sections/CTABanner";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "hero" });

  return {
    title: "OpenVision Group — Merchandising & Branding Solutions",
    description: t("subheadline"),
  };
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <ServicesPreview />
      <ProjectsGrid />
      <ReviewsSection />
      <ValueProposition />
      <CTABanner />
    </>
  );
}
