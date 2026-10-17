import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import { NavBar } from "./components/NavBar";
import Errors from "./components/Errors"; // Import the Errors component
import AnimatedBackground from "./components/background/AnimatedBackground"; // Import the AnimatedBackground component
import "./app.css";
import { Section } from "./components/Section";
import { t } from "./components/theme";
import "./components/theme.css";

export const links: Route.LinksFunction = () => [
  { rel: "icon", href: "/images/initials.ico", type: "image/ico" },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="relative isolate min-h-screen overflow-x-hidden text-slate-800">
        <AnimatedBackground />
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <div className="relative z-10 min-h-screen">
      <NavBar />
      <div className="relative z-10 mx-auto max-w-5xl px-6 py-10">
        <Outlet />
      </div>
    </div>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

    return (
    <main className={`mx-auto max-w-3xl px-6 ${t.pageTop}`}>
      <Section title={message}>
        <p className={`text-base leading-7 ${t.sectionText}`}>{details}</p>
        {stack && (
          <pre className={`mt-4 w-full overflow-x-auto text-xs ${t.sectionText}`}>
            <code>{stack}</code>
          </pre>
        )}
      </Section>
    </main>
  );
}

// // Catch-all route for 404
// <Route path="*" render={() => <Errors errorType={404} />} />
