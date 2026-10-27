import { useEffect, useRef, useState } from "react";
import { t } from "./theme";
// Which surface the skeleton sits on. Colors come from theme.css
// (--color-skeleton, --color-skeleton-dark, --color-skeleton-on-brand).
type Tone = "light" | "dark" | "brand";

const toneClass: Record<Tone, string> = {
  light: t.skeleton,
  dark: t.skeletonDark,
  brand: t.skeletonOnBrand,
};

type SkeletonProps = {
  className?: string;
  tone?: Tone;
};

/** Base building block: a pulsing placeholder box. Size it with className. */
export function Skeleton({ className = "", tone = "light" }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse rounded-md motion-reduce:animate-none ${toneClass[tone]} ${className}`}
    />
  );
}

type ImageWithSkeletonProps = {
  src: string;
  alt: string;
  className?: string;
  wrapperClassName?: string;
  /** Applied to the wrapper only while loading, e.g. "aspect-video w-full" so it has height before the image arrives. */
  loadingClassName?: string;
  tone?: Tone;
};

/** An <img> that shows a skeleton until it has loaded, then fades in. */
export function ImageWithSkeleton({
  src,
  alt,
  className = "",
  wrapperClassName = "",
  loadingClassName = "",
  tone = "dark",
}: ImageWithSkeletonProps) {
  const [status, setStatus] = useState<"loading" | "loaded" | "error">("loading");
  const imgRef = useRef<HTMLImageElement>(null);

  // Reset when src changes, and catch images that were already cached
  // (their onLoad can fire before React attaches the handler).
  useEffect(() => {
    const img = imgRef.current;
    if (img?.complete && img.naturalWidth > 0) {
      setStatus("loaded");
    } else {
      setStatus("loading");
    }
  }, [src]);

  return (
    <div
      className={`relative ${wrapperClassName} ${status === "loading" ? loadingClassName : ""}`}
    >
      {status === "loading" ? (
        <Skeleton tone={tone} className="absolute inset-0 rounded-none" />
      ) : null}

      {status === "error" ? (
        <div
          className={`flex h-full min-h-32 w-full items-center justify-center p-4 text-xs ${t.textSubtle}`}
        >
          Image unavailable
        </div>
      ) : (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          onLoad={() => setStatus("loaded")}
          onError={() => setStatus("error")}
          className={`${className} transition-opacity duration-300 ${
            status === "loaded" ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
    </div>
  );
}

/** Mirrors the layout of ProjectCard so nothing jumps when real content arrives. */
export function ProjectCardSkeleton({ showThumbnail = true }: { showThumbnail?: boolean }) {
  return (
    <article
      role="status"
      aria-busy="true"
      aria-label="Loading project"
      className={`flex flex-col justify-between rounded-2xl border ${t.border} ${t.surfaceMuted} p-6 shadow-sm`}
    >
      <div>
        {showThumbnail ? <Skeleton className="mb-4 aspect-video w-full rounded-lg" /> : null}

        {/* Title */}
        <Skeleton className="h-5 w-2/3" />

        {/* Three description lines (matches line-clamp-3) */}
        <div className="mt-3 space-y-2">
          <Skeleton className="h-3.5 w-full" />
          <Skeleton className="h-3.5 w-full" />
          <Skeleton className="h-3.5 w-4/5" />
        </div>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-2">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-14 rounded-full" />
        </div>
      </div>

      {/* Footer */}
      <div className={`mt-6 flex items-center justify-between border-t ${t.border} pt-4`}>
        <Skeleton className="h-8 w-16 rounded-lg" />
        <Skeleton className="h-4 w-16" />
      </div>
      <span className="sr-only">Loading…</span>
    </article>
  );
}

/** Mirrors the grid used on the Projects page. */
export function ProjectGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <ProjectCardSkeleton key={i} />
      ))}
    </div>
  );
}

/** Mirrors CourseCard (code + term row, title, summary, chips, button). */
export function CourseCardSkeleton() {
  return (
    <article
      role="status"
      aria-busy="true"
      aria-label="Loading course"
      className={`flex flex-col justify-between rounded-2xl border ${t.border} ${t.surfaceMuted} p-5 shadow-sm`}
    >
      <div>
        <div className="flex items-baseline justify-between gap-3">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-3 w-16" />
        </div>
        <Skeleton className="mt-2 h-4 w-3/4" />
        <div className="mt-3 space-y-2">
          <Skeleton className="h-3.5 w-full" />
          <Skeleton className="h-3.5 w-full" />
          <Skeleton className="h-3.5 w-2/3" />
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <Skeleton className="h-5 w-14 rounded-full" />
          <Skeleton className="h-5 w-20 rounded-full" />
        </div>
      </div>
      <div className={`mt-5 border-t ${t.border} pt-4`}>
        <Skeleton className="h-8 w-28 rounded-lg" />
      </div>
      <span className="sr-only">Loading…</span>
    </article>
  );
}

export function CourseGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <CourseCardSkeleton key={i} />
      ))}
    </div>
  );
}

/**
 * Mirrors Section: colored title bar on top, body below.
 * Pass children to fill the body (e.g. a grid skeleton); otherwise it shows text lines.
 */
export function SectionSkeleton({
  lines = 4,
  withTitle = true,
  className = "",
  children,
}: {
  lines?: number;
  withTitle?: boolean;
  className?: string;
  children?: React.ReactNode;
}) {
  // Vary line widths so it reads as text rather than a block
  const widths = ["w-full", "w-11/12", "w-full", "w-3/4", "w-5/6"];

  return (
    <section
      role="status"
      aria-busy="true"
      aria-label="Loading section"
      className={`overflow-hidden rounded-2xl border ${t.border} shadow-sm ${className}`}
    >
      {withTitle ? (
        <div className={`${t.sectionBg} px-8 py-4`}>
          <Skeleton tone="brand" className="h-6 w-48" />
        </div>
      ) : null}

      <div className={`${t.sectionBody} p-8`}>
        {children ?? (
          <div className="space-y-3">
            {Array.from({ length: lines }).map((_, i) => (
              <Skeleton key={i} className={`h-4 ${widths[i % widths.length]}`} />
            ))}
          </div>
        )}
      </div>
      <span className="sr-only">Loading…</span>
    </section>
  );
}

/** Whole-page fallback. The fixed NavBar stays, so this only fills the content area. */
export function PageSkeleton() {
  return (
    <main className={`space-y-8 ${t.pageTop}`}>
      <SectionSkeleton lines={3} />
      <SectionSkeleton>
        <ProjectGridSkeleton count={3} />
      </SectionSkeleton>
    </main>
  );
}
