import { useState, useEffect } from "react";
import { ImageWithSkeleton } from "./Skeleton";
import { t } from "./theme";

type ProjectCardProps = {
  title: string;
  shortDescription?: string;
  longDescription?: string;
  tags: string[];
  link?: string;
  thumbnail?: string;
  exampleImages?: string[];
};

export function ProjectCard({
  title,
  shortDescription,
  longDescription,
  tags,
  link,
  thumbnail,
  exampleImages = [],
}: ProjectCardProps) {
  const [isInspecting, setIsInspecting] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Lock background scroll and allow Escape to close while the modal is open
  useEffect(() => {
    document.body.style.overflow = isInspecting ? "hidden" : "unset";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsInspecting(false);
    };
    if (isInspecting) window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isInspecting]);

  const handleNextImage = () => {
    if (exampleImages.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % exampleImages.length);
    }
  };

  const handlePrevImage = () => {
    if (exampleImages.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + exampleImages.length) % exampleImages.length);
    }
  };

  return (
    <>
      {/* --- MAIN CARD --- */}
      <article
        className={`flex flex-col justify-between rounded-2xl border ${t.border} ${t.surfaceMuted} p-6 shadow-sm`}
      >
        <div>
          {thumbnail ? (
            <ImageWithSkeleton
              src={thumbnail}
              alt={`${title} thumbnail`}
              tone="dark"
              wrapperClassName={`mb-4 aspect-video w-full overflow-hidden rounded-lg border ${t.border} ${t.mediaBg}`}
              className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            />
          ) : null}

          <h3 className={`text-lg font-semibold ${t.text}`}>{title}</h3>

          <p className={`mt-2 text-sm leading-6 ${t.textMuted} line-clamp-3`}>
            {shortDescription || longDescription}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className={`rounded-full px-3 py-1 text-xs font-medium ${t.chip}`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Card Footer Buttons */}
        <div className={`mt-6 flex items-center justify-between border-t ${t.border} pt-4`}>
          <button
            onClick={() => {
              setCurrentImageIndex(0);
              setIsInspecting(true);
            }}
            type="button"
            className={`rounded-lg px-4 py-2 text-xs font-semibold transition ${t.btnPrimary}`}
          >
            Inspect
          </button>

          {link ? (
            <a
              href={link}
              target="_blank"
              rel="noreferrer"
              className={`text-xs font-medium underline-offset-4 hover:underline ${t.textBrand}`}
            >
              {link.includes("github.com") ? "GitHub →" : "Link →"}
            </a>
          ) : null}
        </div>
      </article>

      {/* --- INSPECT MODAL OVERLAY --- */}
      {isInspecting ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
          {/* Blurred Backdrop */}
          <div
            className={`fixed inset-0 ${t.backdrop} backdrop-blur-md transition-opacity`}
            onClick={() => setIsInspecting(false)}
          />

          {/* Scrollable Modal Container */}
          <div
            role="dialog"
            aria-modal="true"
            aria-label={title}
            className={`relative z-10 max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border ${t.border} ${t.surface} p-6 shadow-2xl sm:p-8`}
          >
            {/* Header & Exit Button */}
            <div className={`flex items-start justify-between border-b ${t.border} pb-4`}>
              <div>
                <h2 className={`text-2xl font-bold ${t.text}`}>{title}</h2>
                <div className="mt-2 flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${t.chip}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setIsInspecting(false)}
                type="button"
                className={`rounded-full p-2 ${t.iconBtn}`}
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div className="mt-6 space-y-6">
              {/* Full Description */}
              <div>
                <h4 className={`text-xs font-semibold uppercase tracking-wider ${t.textSubtle}`}>
                  About the Project
                </h4>
                <p className={`mt-2 text-base leading-7 ${t.textMuted} whitespace-pre-line`}>
                  {longDescription || shortDescription}
                </p>
              </div>

              {/* Image Slideshow */}
              {exampleImages.length > 0 ? (
                <div>
                  <h4
                    className={`mb-2 text-xs font-semibold uppercase tracking-wider ${t.textSubtle}`}
                  >
                    Preview Images
                  </h4>
                  <div
                    className={`relative overflow-hidden rounded-xl border ${t.border} ${t.mediaBg}`}
                  >
                    {/* key resets the skeleton on every slide change */}
                    <ImageWithSkeleton
                      key={exampleImages[currentImageIndex]}
                      src={exampleImages[currentImageIndex]}
                      alt={`${title} preview ${currentImageIndex + 1}`}
                      tone="dark"
                      loadingClassName="aspect-video w-full"
                      className="max-h-[60vh] w-auto max-w-full object-contain"
                    />

                    {/* Slideshow Controls */}
                    {exampleImages.length > 1 ? (
                      <div className="absolute inset-x-0 bottom-3 flex items-center justify-between px-4">
                        <button
                          onClick={handlePrevImage}
                          type="button"
                          className={`rounded-md px-3 py-1 text-xs font-medium ${t.overlay} ${t.textOnBrand} backdrop-blur`}
                        >
                          ← Prev
                        </button>
                        <span
                          className={`rounded-md px-2.5 py-1 text-xs font-medium ${t.overlay} ${t.textOnBrand} backdrop-blur`}
                        >
                          {currentImageIndex + 1} / {exampleImages.length}
                        </span>
                        <button
                          onClick={handleNextImage}
                          type="button"
                          className={`rounded-md px-3 py-1 text-xs font-medium ${t.overlay} ${t.textOnBrand} backdrop-blur`}
                        >
                          Next →
                        </button>
                      </div>
                    ) : null}
                  </div>
                </div>
              ) : null}
            </div>

            {/* Modal Footer Links */}
            <div className={`mt-8 flex items-center justify-between border-t ${t.border} pt-4`}>
              {link ? (
                <a
                  href={link}
                  target="_blank"
                  rel="noreferrer"
                  className={`rounded-lg px-4 py-2 text-xs font-semibold transition ${t.btnPrimary}`}
                >
                  {link.includes("github.com") ? "View on GitHub →" : "Visit Project →"}
                </a>
              ) : (
                <div />
              )}

              <button
                onClick={() => setIsInspecting(false)}
                type="button"
                className={`text-xs font-medium ${t.textBtn}`}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
