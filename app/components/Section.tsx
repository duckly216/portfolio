import type { ReactNode } from "react";
import { t } from "./theme";

type SectionProps = {
  id?: string;
  title?: string;
  children: ReactNode;
  className?: string;
};

export function Section({ id, title, children, className = "" }: SectionProps) {
  return (
    <section
      id={id}
      className={`overflow-hidden rounded-2xl border ${t.border} shadow-sm ${className}`}
    >
      {title ? (
        <div className={`${t.sectionBg} px-8 py-4`}>
          <h2 className={`text-xl font-semibold tracking-tight ${t.sectionTitle}`}>
            {title}
          </h2>
        </div>
      ) : null}

      <div className={`${t.sectionBody} p-8`}>{children}</div>
    </section>
  );
}