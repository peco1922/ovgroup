import { notFound } from "next/navigation";

// Unreachable: next-intl middleware rewrites all requests to [locale]/page.tsx
export default function RootPage() {
  notFound();
}
