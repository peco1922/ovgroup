"use client";

import { useState } from "react";
import { Heart, ChevronDown, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

type Org = {
  id: string;
  name: string;
  description: string;
  website?: string;
};

export function OrganizationCard({ org }: { org: Org }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <button
      onClick={() => setExpanded((v) => !v)}
      className={cn(
        "w-full text-left p-6 rounded-2xl border transition-all duration-300 space-y-3 group",
        "bg-canvas hover:shadow-md",
        expanded
          ? "border-brand-pink/40 shadow-sm"
          : "border-border/50 hover:border-brand-pink/30"
      )}
      aria-expanded={expanded}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="w-10 h-10 rounded-lg bg-brand-pink/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-pink/20 transition-colors">
          <Heart className="h-4 w-4 text-brand-pink" />
        </div>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-ink-subtle mt-1 flex-shrink-0 transition-transform duration-300",
            expanded && "rotate-180"
          )}
        />
      </div>

      <h3 className="font-semibold text-ink">{org.name}</h3>

      <div
        className={cn(
          "overflow-hidden transition-all duration-300",
          expanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <p className="text-sm text-ink-muted leading-relaxed pt-1 pb-3">
          {org.description}
        </p>
        {org.website && (
          <a
            href={org.website}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-brand-pink hover:text-brand-pink/80 transition-colors"
          >
            Visitar website
            <ExternalLink className="h-3 w-3" />
          </a>
        )}
      </div>

      {!expanded && (
        <p className="text-xs text-ink-subtle group-hover:text-brand-pink transition-colors">
          Saber mais →
        </p>
      )}
    </button>
  );
}
