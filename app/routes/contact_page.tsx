import type { Route } from "./+types/contact_page";
import { Section } from "../components/Section";
import { t } from "../components/theme";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Contact | Jorge R." },
    { name: "description", content: "Ways to get in touch with Jorge Ramirez." },
  ];
}

const contacts = [
  {
    label: "LinkedIn",
    value: "linkedin.com/in/jorge-patricio-ramirez",
    href: "https://www.linkedin.com/in/jorge-patricio-ramirez/",
    external: true,
  },
  {
    label: "School email",
    value: "ramirez.j1@ufl.edu",
    href: "mailto:ramirez.j1@ufl.edu",
  },
  {
    label: "Personal email",
    value: "jorgep020905@gmail.com",
    href: "mailto:jorgep020905@gmail.com",
  },
];

export default function Contact() {
  return (
    <main className={`space-y-8 ${t.pageTop}`}>
      <Section id="contact" title="Contact">
        <p className={`mb-6 max-w-3xl text-base leading-7 ${t.sectionText}`}>
          If you want to talk about software, collaboration, or opportunities,
          feel free to reach out.
        </p>

        <div className="grid gap-5 md:grid-cols-3">
          {contacts.map(({ label, value, href, external }) => (
            <a
              key={label}
              href={href}
              {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
              className={`group rounded-2xl border ${t.border} ${t.surfaceMuted} p-5 shadow-sm`}
            >
              <p className={`text-xs font-semibold uppercase tracking-wider ${t.textSubtle}`}>
                {label}
              </p>
              <p
                className={`mt-2 break-words text-sm font-medium underline-offset-4 group-hover:underline ${t.textBrand}`}
              >
                {value}
              </p>
            </a>
          ))}
        </div>
      </Section>
    </main>
  );
}